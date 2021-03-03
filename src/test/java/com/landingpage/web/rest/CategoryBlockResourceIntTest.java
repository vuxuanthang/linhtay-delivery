package com.landingpage.web.rest;

import com.landingpage.CallCrmApp;

import com.landingpage.domain.CategoryBlock;
import com.landingpage.repository.CategoryBlockRepository;
import com.landingpage.service.CategoryBlockService;
import com.landingpage.service.dto.CategoryBlockDTO;
import com.landingpage.service.mapper.CategoryBlockMapper;
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
 * Test class for the CategoryBlockResource REST controller.
 *
 * @see CategoryBlockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CallCrmApp.class)
public class CategoryBlockResourceIntTest {

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

    @Autowired
    private CategoryBlockRepository categoryBlockRepository;

    @Autowired
    private CategoryBlockMapper categoryBlockMapper;

    @Autowired
    private CategoryBlockService categoryBlockService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCategoryBlockMockMvc;

    private CategoryBlock categoryBlock;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoryBlockResource categoryBlockResource = new CategoryBlockResource(categoryBlockService);
        this.restCategoryBlockMockMvc = MockMvcBuilders.standaloneSetup(categoryBlockResource)
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
    public static CategoryBlock createEntity(EntityManager em) {
        CategoryBlock categoryBlock = new CategoryBlock()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .urlLink(DEFAULT_URL_LINK)
            .active(DEFAULT_ACTIVE)
            .createdOn(DEFAULT_CREATED_ON);
        return categoryBlock;
    }

    @Before
    public void initTest() {
        categoryBlock = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoryBlock() throws Exception {
        int databaseSizeBeforeCreate = categoryBlockRepository.findAll().size();

        // Create the CategoryBlock
        CategoryBlockDTO categoryBlockDTO = categoryBlockMapper.toDto(categoryBlock);
        restCategoryBlockMockMvc.perform(post("/api/category-blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryBlockDTO)))
            .andExpect(status().isCreated());

        // Validate the CategoryBlock in the database
        List<CategoryBlock> categoryBlockList = categoryBlockRepository.findAll();
        assertThat(categoryBlockList).hasSize(databaseSizeBeforeCreate + 1);
        CategoryBlock testCategoryBlock = categoryBlockList.get(categoryBlockList.size() - 1);
        assertThat(testCategoryBlock.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCategoryBlock.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCategoryBlock.getUrlLink()).isEqualTo(DEFAULT_URL_LINK);
        assertThat(testCategoryBlock.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testCategoryBlock.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
    }

    @Test
    @Transactional
    public void createCategoryBlockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoryBlockRepository.findAll().size();

        // Create the CategoryBlock with an existing ID
        categoryBlock.setId(1L);
        CategoryBlockDTO categoryBlockDTO = categoryBlockMapper.toDto(categoryBlock);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoryBlockMockMvc.perform(post("/api/category-blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryBlockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CategoryBlock in the database
        List<CategoryBlock> categoryBlockList = categoryBlockRepository.findAll();
        assertThat(categoryBlockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCategoryBlocks() throws Exception {
        // Initialize the database
        categoryBlockRepository.saveAndFlush(categoryBlock);

        // Get all the categoryBlockList
        restCategoryBlockMockMvc.perform(get("/api/category-blocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoryBlock.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].urlLink").value(hasItem(DEFAULT_URL_LINK.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())));
    }

    @Test
    @Transactional
    public void getCategoryBlock() throws Exception {
        // Initialize the database
        categoryBlockRepository.saveAndFlush(categoryBlock);

        // Get the categoryBlock
        restCategoryBlockMockMvc.perform(get("/api/category-blocks/{id}", categoryBlock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoryBlock.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.urlLink").value(DEFAULT_URL_LINK.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCategoryBlock() throws Exception {
        // Get the categoryBlock
        restCategoryBlockMockMvc.perform(get("/api/category-blocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoryBlock() throws Exception {
        // Initialize the database
        categoryBlockRepository.saveAndFlush(categoryBlock);
        int databaseSizeBeforeUpdate = categoryBlockRepository.findAll().size();

        // Update the categoryBlock
        CategoryBlock updatedCategoryBlock = categoryBlockRepository.findOne(categoryBlock.getId());
        // Disconnect from session so that the updates on updatedCategoryBlock are not directly saved in db
        em.detach(updatedCategoryBlock);
        updatedCategoryBlock
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .urlLink(UPDATED_URL_LINK)
            .active(UPDATED_ACTIVE)
            .createdOn(UPDATED_CREATED_ON);
        CategoryBlockDTO categoryBlockDTO = categoryBlockMapper.toDto(updatedCategoryBlock);

        restCategoryBlockMockMvc.perform(put("/api/category-blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryBlockDTO)))
            .andExpect(status().isOk());

        // Validate the CategoryBlock in the database
        List<CategoryBlock> categoryBlockList = categoryBlockRepository.findAll();
        assertThat(categoryBlockList).hasSize(databaseSizeBeforeUpdate);
        CategoryBlock testCategoryBlock = categoryBlockList.get(categoryBlockList.size() - 1);
        assertThat(testCategoryBlock.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCategoryBlock.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCategoryBlock.getUrlLink()).isEqualTo(UPDATED_URL_LINK);
        assertThat(testCategoryBlock.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testCategoryBlock.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoryBlock() throws Exception {
        int databaseSizeBeforeUpdate = categoryBlockRepository.findAll().size();

        // Create the CategoryBlock
        CategoryBlockDTO categoryBlockDTO = categoryBlockMapper.toDto(categoryBlock);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCategoryBlockMockMvc.perform(put("/api/category-blocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryBlockDTO)))
            .andExpect(status().isCreated());

        // Validate the CategoryBlock in the database
        List<CategoryBlock> categoryBlockList = categoryBlockRepository.findAll();
        assertThat(categoryBlockList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCategoryBlock() throws Exception {
        // Initialize the database
        categoryBlockRepository.saveAndFlush(categoryBlock);
        int databaseSizeBeforeDelete = categoryBlockRepository.findAll().size();

        // Get the categoryBlock
        restCategoryBlockMockMvc.perform(delete("/api/category-blocks/{id}", categoryBlock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CategoryBlock> categoryBlockList = categoryBlockRepository.findAll();
        assertThat(categoryBlockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoryBlock.class);
        CategoryBlock categoryBlock1 = new CategoryBlock();
        categoryBlock1.setId(1L);
        CategoryBlock categoryBlock2 = new CategoryBlock();
        categoryBlock2.setId(categoryBlock1.getId());
        assertThat(categoryBlock1).isEqualTo(categoryBlock2);
        categoryBlock2.setId(2L);
        assertThat(categoryBlock1).isNotEqualTo(categoryBlock2);
        categoryBlock1.setId(null);
        assertThat(categoryBlock1).isNotEqualTo(categoryBlock2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoryBlockDTO.class);
        CategoryBlockDTO categoryBlockDTO1 = new CategoryBlockDTO();
        categoryBlockDTO1.setId(1L);
        CategoryBlockDTO categoryBlockDTO2 = new CategoryBlockDTO();
        assertThat(categoryBlockDTO1).isNotEqualTo(categoryBlockDTO2);
        categoryBlockDTO2.setId(categoryBlockDTO1.getId());
        assertThat(categoryBlockDTO1).isEqualTo(categoryBlockDTO2);
        categoryBlockDTO2.setId(2L);
        assertThat(categoryBlockDTO1).isNotEqualTo(categoryBlockDTO2);
        categoryBlockDTO1.setId(null);
        assertThat(categoryBlockDTO1).isNotEqualTo(categoryBlockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(categoryBlockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(categoryBlockMapper.fromId(null)).isNull();
    }
}
