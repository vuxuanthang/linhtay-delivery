package com.landingpage.web.rest;

import com.landingpage.CallCrmApp;

import com.landingpage.domain.Block;
import com.landingpage.repository.BlockRepository;
import com.landingpage.service.BlockService;
import com.landingpage.service.dto.BlockDTO;
import com.landingpage.service.mapper.BlockMapper;
import com.landingpage.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.landingpage.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BlockResource REST controller.
 *
 * @see BlockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CallCrmApp.class)
public class BlockResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_URL_LINK = "AAAAAAAAAA";
    private static final String UPDATED_URL_LINK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private BlockMapper blockMapper;

    @Autowired
    private BlockService blockService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlockMockMvc;

    private Block block;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlockResource blockResource = new BlockResource(blockService);
        this.restBlockMockMvc = MockMvcBuilders.standaloneSetup(blockResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Block createEntity(EntityManager em) {
        Block block = new Block()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .urlLink(DEFAULT_URL_LINK)
            .active(DEFAULT_ACTIVE)
            .createdOn(DEFAULT_CREATED_ON)
            .content(DEFAULT_CONTENT);
        return block;
    }

    @Before
    public void initTest() {
        block = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlock() throws Exception {
        int databaseSizeBeforeCreate = blockRepository.findAll().size();

        // Create the Block
        BlockDTO blockDTO = blockMapper.toDto(block);
        restBlockMockMvc.perform(post("/api/blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockDTO)))
            .andExpect(status().isCreated());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeCreate + 1);
        Block testBlock = blockList.get(blockList.size() - 1);
        assertThat(testBlock.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBlock.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testBlock.getUrlLink()).isEqualTo(DEFAULT_URL_LINK);
        assertThat(testBlock.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testBlock.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testBlock.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createBlockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blockRepository.findAll().size();

        // Create the Block with an existing ID
        block.setId(1L);
        BlockDTO blockDTO = blockMapper.toDto(block);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlockMockMvc.perform(post("/api/blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBlocks() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);

        // Get all the blockList
        restBlockMockMvc.perform(get("/api/blocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(block.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].urlLink").value(hasItem(DEFAULT_URL_LINK.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getBlock() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);

        // Get the block
        restBlockMockMvc.perform(get("/api/blocks/{id}", block.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(block.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.urlLink").value(DEFAULT_URL_LINK.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBlock() throws Exception {
        // Get the block
        restBlockMockMvc.perform(get("/api/blocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlock() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);
        int databaseSizeBeforeUpdate = blockRepository.findAll().size();

        // Update the block
        Block updatedBlock = blockRepository.findOne(block.getId());
        // Disconnect from session so that the updates on updatedBlock are not directly saved in db
        em.detach(updatedBlock);
        updatedBlock
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .urlLink(UPDATED_URL_LINK)
            .active(UPDATED_ACTIVE)
            .createdOn(UPDATED_CREATED_ON)
            .content(UPDATED_CONTENT);
        BlockDTO blockDTO = blockMapper.toDto(updatedBlock);

        restBlockMockMvc.perform(put("/api/blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockDTO)))
            .andExpect(status().isOk());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeUpdate);
        Block testBlock = blockList.get(blockList.size() - 1);
        assertThat(testBlock.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBlock.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testBlock.getUrlLink()).isEqualTo(UPDATED_URL_LINK);
        assertThat(testBlock.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testBlock.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testBlock.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingBlock() throws Exception {
        int databaseSizeBeforeUpdate = blockRepository.findAll().size();

        // Create the Block
        BlockDTO blockDTO = blockMapper.toDto(block);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlockMockMvc.perform(put("/api/blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockDTO)))
            .andExpect(status().isCreated());

        // Validate the Block in the database
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBlock() throws Exception {
        // Initialize the database
        blockRepository.saveAndFlush(block);
        int databaseSizeBeforeDelete = blockRepository.findAll().size();

        // Get the block
        restBlockMockMvc.perform(delete("/api/blocks/{id}", block.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Block> blockList = blockRepository.findAll();
        assertThat(blockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Block.class);
        Block block1 = new Block();
        block1.setId(1L);
        Block block2 = new Block();
        block2.setId(block1.getId());
        assertThat(block1).isEqualTo(block2);
        block2.setId(2L);
        assertThat(block1).isNotEqualTo(block2);
        block1.setId(null);
        assertThat(block1).isNotEqualTo(block2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlockDTO.class);
        BlockDTO blockDTO1 = new BlockDTO();
        blockDTO1.setId(1L);
        BlockDTO blockDTO2 = new BlockDTO();
        assertThat(blockDTO1).isNotEqualTo(blockDTO2);
        blockDTO2.setId(blockDTO1.getId());
        assertThat(blockDTO1).isEqualTo(blockDTO2);
        blockDTO2.setId(2L);
        assertThat(blockDTO1).isNotEqualTo(blockDTO2);
        blockDTO1.setId(null);
        assertThat(blockDTO1).isNotEqualTo(blockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(blockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(blockMapper.fromId(null)).isNull();
    }
}
