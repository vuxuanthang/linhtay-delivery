package com.landingpage.web.rest;

import com.landingpage.CallCrmApp;

import com.landingpage.domain.Page;
import com.landingpage.repository.PageRepository;
import com.landingpage.service.PageService;
import com.landingpage.service.dto.PageDTO;
import com.landingpage.service.mapper.PageMapper;
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
 * Test class for the PageResource REST controller.
 *
 * @see PageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CallCrmApp.class)
public class PageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_URL_LINK = "AAAAAAAAAA";
    private static final String UPDATED_URL_LINK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private PageService pageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPageMockMvc;

    private Page page;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PageResource pageResource = new PageResource(pageService);
        this.restPageMockMvc = MockMvcBuilders.standaloneSetup(pageResource)
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
    public static Page createEntity(EntityManager em) {
        Page page = new Page()
            .name(DEFAULT_NAME)
            .content(DEFAULT_CONTENT)
            .urlLink(DEFAULT_URL_LINK)
            .active(DEFAULT_ACTIVE)
            .createdOn(DEFAULT_CREATED_ON);
        return page;
    }

    @Before
    public void initTest() {
        page = createEntity(em);
    }

    @Test
    @Transactional
    public void createPage() throws Exception {
        int databaseSizeBeforeCreate = pageRepository.findAll().size();

        // Create the Page
        PageDTO pageDTO = pageMapper.toDto(page);
        restPageMockMvc.perform(post("/api/pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isCreated());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeCreate + 1);
        Page testPage = pageList.get(pageList.size() - 1);
        assertThat(testPage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPage.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testPage.getUrlLink()).isEqualTo(DEFAULT_URL_LINK);
        assertThat(testPage.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testPage.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
    }

    @Test
    @Transactional
    public void createPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pageRepository.findAll().size();

        // Create the Page with an existing ID
        page.setId(1L);
        PageDTO pageDTO = pageMapper.toDto(page);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPageMockMvc.perform(post("/api/pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPages() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);

        // Get all the pageList
        restPageMockMvc.perform(get("/api/pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(page.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].urlLink").value(hasItem(DEFAULT_URL_LINK.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())));
    }

    @Test
    @Transactional
    public void getPage() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);

        // Get the page
        restPageMockMvc.perform(get("/api/pages/{id}", page.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(page.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.urlLink").value(DEFAULT_URL_LINK.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPage() throws Exception {
        // Get the page
        restPageMockMvc.perform(get("/api/pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePage() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);
        int databaseSizeBeforeUpdate = pageRepository.findAll().size();

        // Update the page
        Page updatedPage = pageRepository.findOne(page.getId());
        // Disconnect from session so that the updates on updatedPage are not directly saved in db
        em.detach(updatedPage);
        updatedPage
            .name(UPDATED_NAME)
            .content(UPDATED_CONTENT)
            .urlLink(UPDATED_URL_LINK)
            .active(UPDATED_ACTIVE)
            .createdOn(UPDATED_CREATED_ON);
        PageDTO pageDTO = pageMapper.toDto(updatedPage);

        restPageMockMvc.perform(put("/api/pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isOk());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeUpdate);
        Page testPage = pageList.get(pageList.size() - 1);
        assertThat(testPage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPage.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testPage.getUrlLink()).isEqualTo(UPDATED_URL_LINK);
        assertThat(testPage.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testPage.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingPage() throws Exception {
        int databaseSizeBeforeUpdate = pageRepository.findAll().size();

        // Create the Page
        PageDTO pageDTO = pageMapper.toDto(page);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPageMockMvc.perform(put("/api/pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pageDTO)))
            .andExpect(status().isCreated());

        // Validate the Page in the database
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePage() throws Exception {
        // Initialize the database
        pageRepository.saveAndFlush(page);
        int databaseSizeBeforeDelete = pageRepository.findAll().size();

        // Get the page
        restPageMockMvc.perform(delete("/api/pages/{id}", page.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Page> pageList = pageRepository.findAll();
        assertThat(pageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Page.class);
        Page page1 = new Page();
        page1.setId(1L);
        Page page2 = new Page();
        page2.setId(page1.getId());
        assertThat(page1).isEqualTo(page2);
        page2.setId(2L);
        assertThat(page1).isNotEqualTo(page2);
        page1.setId(null);
        assertThat(page1).isNotEqualTo(page2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PageDTO.class);
        PageDTO pageDTO1 = new PageDTO();
        pageDTO1.setId(1L);
        PageDTO pageDTO2 = new PageDTO();
        assertThat(pageDTO1).isNotEqualTo(pageDTO2);
        pageDTO2.setId(pageDTO1.getId());
        assertThat(pageDTO1).isEqualTo(pageDTO2);
        pageDTO2.setId(2L);
        assertThat(pageDTO1).isNotEqualTo(pageDTO2);
        pageDTO1.setId(null);
        assertThat(pageDTO1).isNotEqualTo(pageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pageMapper.fromId(null)).isNull();
    }
}
