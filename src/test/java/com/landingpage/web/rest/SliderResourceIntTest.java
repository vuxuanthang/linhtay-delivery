package com.landingpage.web.rest;

import com.landingpage.CallCrmApp;

import com.landingpage.domain.Slider;
import com.landingpage.repository.SliderRepository;
import com.landingpage.service.SliderService;
import com.landingpage.service.dto.SliderDTO;
import com.landingpage.service.mapper.SliderMapper;
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
 * Test class for the SliderResource REST controller.
 *
 * @see SliderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CallCrmApp.class)
public class SliderResourceIntTest {

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
    private SliderRepository sliderRepository;

    @Autowired
    private SliderMapper sliderMapper;

    @Autowired
    private SliderService sliderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSliderMockMvc;

    private Slider slider;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SliderResource sliderResource = new SliderResource(sliderService);
        this.restSliderMockMvc = MockMvcBuilders.standaloneSetup(sliderResource)
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
    public static Slider createEntity(EntityManager em) {
        Slider slider = new Slider()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .urlLink(DEFAULT_URL_LINK)
            .active(DEFAULT_ACTIVE)
            .createdOn(DEFAULT_CREATED_ON)
            .content(DEFAULT_CONTENT);
        return slider;
    }

    @Before
    public void initTest() {
        slider = createEntity(em);
    }

    @Test
    @Transactional
    public void createSlider() throws Exception {
        int databaseSizeBeforeCreate = sliderRepository.findAll().size();

        // Create the Slider
        SliderDTO sliderDTO = sliderMapper.toDto(slider);
        restSliderMockMvc.perform(post("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sliderDTO)))
            .andExpect(status().isCreated());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeCreate + 1);
        Slider testSlider = sliderList.get(sliderList.size() - 1);
        assertThat(testSlider.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSlider.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testSlider.getUrlLink()).isEqualTo(DEFAULT_URL_LINK);
        assertThat(testSlider.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testSlider.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testSlider.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createSliderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sliderRepository.findAll().size();

        // Create the Slider with an existing ID
        slider.setId(1L);
        SliderDTO sliderDTO = sliderMapper.toDto(slider);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSliderMockMvc.perform(post("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sliderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSliders() throws Exception {
        // Initialize the database
        sliderRepository.saveAndFlush(slider);

        // Get all the sliderList
        restSliderMockMvc.perform(get("/api/sliders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slider.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].urlLink").value(hasItem(DEFAULT_URL_LINK.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getSlider() throws Exception {
        // Initialize the database
        sliderRepository.saveAndFlush(slider);

        // Get the slider
        restSliderMockMvc.perform(get("/api/sliders/{id}", slider.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(slider.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.urlLink").value(DEFAULT_URL_LINK.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSlider() throws Exception {
        // Get the slider
        restSliderMockMvc.perform(get("/api/sliders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSlider() throws Exception {
        // Initialize the database
        sliderRepository.saveAndFlush(slider);
        int databaseSizeBeforeUpdate = sliderRepository.findAll().size();

        // Update the slider
        Slider updatedSlider = sliderRepository.findOne(slider.getId());
        // Disconnect from session so that the updates on updatedSlider are not directly saved in db
        em.detach(updatedSlider);
        updatedSlider
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .urlLink(UPDATED_URL_LINK)
            .active(UPDATED_ACTIVE)
            .createdOn(UPDATED_CREATED_ON)
            .content(UPDATED_CONTENT);
        SliderDTO sliderDTO = sliderMapper.toDto(updatedSlider);

        restSliderMockMvc.perform(put("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sliderDTO)))
            .andExpect(status().isOk());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeUpdate);
        Slider testSlider = sliderList.get(sliderList.size() - 1);
        assertThat(testSlider.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSlider.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testSlider.getUrlLink()).isEqualTo(UPDATED_URL_LINK);
        assertThat(testSlider.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testSlider.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testSlider.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingSlider() throws Exception {
        int databaseSizeBeforeUpdate = sliderRepository.findAll().size();

        // Create the Slider
        SliderDTO sliderDTO = sliderMapper.toDto(slider);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSliderMockMvc.perform(put("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sliderDTO)))
            .andExpect(status().isCreated());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSlider() throws Exception {
        // Initialize the database
        sliderRepository.saveAndFlush(slider);
        int databaseSizeBeforeDelete = sliderRepository.findAll().size();

        // Get the slider
        restSliderMockMvc.perform(delete("/api/sliders/{id}", slider.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Slider.class);
        Slider slider1 = new Slider();
        slider1.setId(1L);
        Slider slider2 = new Slider();
        slider2.setId(slider1.getId());
        assertThat(slider1).isEqualTo(slider2);
        slider2.setId(2L);
        assertThat(slider1).isNotEqualTo(slider2);
        slider1.setId(null);
        assertThat(slider1).isNotEqualTo(slider2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SliderDTO.class);
        SliderDTO sliderDTO1 = new SliderDTO();
        sliderDTO1.setId(1L);
        SliderDTO sliderDTO2 = new SliderDTO();
        assertThat(sliderDTO1).isNotEqualTo(sliderDTO2);
        sliderDTO2.setId(sliderDTO1.getId());
        assertThat(sliderDTO1).isEqualTo(sliderDTO2);
        sliderDTO2.setId(2L);
        assertThat(sliderDTO1).isNotEqualTo(sliderDTO2);
        sliderDTO1.setId(null);
        assertThat(sliderDTO1).isNotEqualTo(sliderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sliderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sliderMapper.fromId(null)).isNull();
    }
}
