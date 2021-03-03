package com.landingpage.web.rest;

import com.landingpage.CallCrmApp;

import com.landingpage.domain.Lead;
import com.landingpage.repository.LeadRepository;
import com.landingpage.service.dto.LeadDTO;
import com.landingpage.service.mapper.LeadMapper;
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
 * Test class for the LeadResource REST controller.
 *
 * @see LeadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CallCrmApp.class)
public class LeadResourceIntTest {

    private static final String DEFAULT_FULL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FULL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IS_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_IS_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_USER_CODE = "AAAAAAAAAA";
    private static final String UPDATED_USER_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private LeadMapper leadMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLeadMockMvc;

    private Lead lead;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LeadResource leadResource = new LeadResource(leadRepository, leadMapper);
        this.restLeadMockMvc = MockMvcBuilders.standaloneSetup(leadResource)
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
    public static Lead createEntity(EntityManager em) {
        Lead lead = new Lead()
            .fullName(DEFAULT_FULL_NAME)
            .isContact(DEFAULT_IS_CONTACT)
            .mobilePhone(DEFAULT_MOBILE_PHONE)
            .email(DEFAULT_EMAIL)
            .address(DEFAULT_ADDRESS)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .userCode(DEFAULT_USER_CODE)
            .createdOn(DEFAULT_CREATED_ON);
        return lead;
    }

    @Before
    public void initTest() {
        lead = createEntity(em);
    }

    @Test
    @Transactional
    public void createLead() throws Exception {
        int databaseSizeBeforeCreate = leadRepository.findAll().size();

        // Create the Lead
        LeadDTO leadDTO = leadMapper.toDto(lead);
        restLeadMockMvc.perform(post("/api/leads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leadDTO)))
            .andExpect(status().isCreated());

        // Validate the Lead in the database
        List<Lead> leadList = leadRepository.findAll();
        assertThat(leadList).hasSize(databaseSizeBeforeCreate + 1);
        Lead testLead = leadList.get(leadList.size() - 1);
        assertThat(testLead.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testLead.getIsContact()).isEqualTo(DEFAULT_IS_CONTACT);
        assertThat(testLead.getMobilePhone()).isEqualTo(DEFAULT_MOBILE_PHONE);
        assertThat(testLead.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testLead.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testLead.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testLead.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testLead.getUserCode()).isEqualTo(DEFAULT_USER_CODE);
        assertThat(testLead.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
    }

    @Test
    @Transactional
    public void createLeadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leadRepository.findAll().size();

        // Create the Lead with an existing ID
        lead.setId(1L);
        LeadDTO leadDTO = leadMapper.toDto(lead);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeadMockMvc.perform(post("/api/leads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leadDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lead in the database
        List<Lead> leadList = leadRepository.findAll();
        assertThat(leadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLeads() throws Exception {
        // Initialize the database
        leadRepository.saveAndFlush(lead);

        // Get all the leadList
        restLeadMockMvc.perform(get("/api/leads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lead.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME.toString())))
            .andExpect(jsonPath("$.[*].isContact").value(hasItem(DEFAULT_IS_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].mobilePhone").value(hasItem(DEFAULT_MOBILE_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].userCode").value(hasItem(DEFAULT_USER_CODE.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())));
    }

    @Test
    @Transactional
    public void getLead() throws Exception {
        // Initialize the database
        leadRepository.saveAndFlush(lead);

        // Get the lead
        restLeadMockMvc.perform(get("/api/leads/{id}", lead.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lead.getId().intValue()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME.toString()))
            .andExpect(jsonPath("$.isContact").value(DEFAULT_IS_CONTACT.toString()))
            .andExpect(jsonPath("$.mobilePhone").value(DEFAULT_MOBILE_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.userCode").value(DEFAULT_USER_CODE.toString()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLead() throws Exception {
        // Get the lead
        restLeadMockMvc.perform(get("/api/leads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLead() throws Exception {
        // Initialize the database
        leadRepository.saveAndFlush(lead);
        int databaseSizeBeforeUpdate = leadRepository.findAll().size();

        // Update the lead
        Lead updatedLead = leadRepository.findOne(lead.getId());
        // Disconnect from session so that the updates on updatedLead are not directly saved in db
        em.detach(updatedLead);
        updatedLead
            .fullName(UPDATED_FULL_NAME)
            .isContact(UPDATED_IS_CONTACT)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .email(UPDATED_EMAIL)
            .address(UPDATED_ADDRESS)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .userCode(UPDATED_USER_CODE)
            .createdOn(UPDATED_CREATED_ON);
        LeadDTO leadDTO = leadMapper.toDto(updatedLead);

        restLeadMockMvc.perform(put("/api/leads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leadDTO)))
            .andExpect(status().isOk());

        // Validate the Lead in the database
        List<Lead> leadList = leadRepository.findAll();
        assertThat(leadList).hasSize(databaseSizeBeforeUpdate);
        Lead testLead = leadList.get(leadList.size() - 1);
        assertThat(testLead.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testLead.getIsContact()).isEqualTo(UPDATED_IS_CONTACT);
        assertThat(testLead.getMobilePhone()).isEqualTo(UPDATED_MOBILE_PHONE);
        assertThat(testLead.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testLead.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testLead.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testLead.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testLead.getUserCode()).isEqualTo(UPDATED_USER_CODE);
        assertThat(testLead.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingLead() throws Exception {
        int databaseSizeBeforeUpdate = leadRepository.findAll().size();

        // Create the Lead
        LeadDTO leadDTO = leadMapper.toDto(lead);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLeadMockMvc.perform(put("/api/leads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leadDTO)))
            .andExpect(status().isCreated());

        // Validate the Lead in the database
        List<Lead> leadList = leadRepository.findAll();
        assertThat(leadList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLead() throws Exception {
        // Initialize the database
        leadRepository.saveAndFlush(lead);
        int databaseSizeBeforeDelete = leadRepository.findAll().size();

        // Get the lead
        restLeadMockMvc.perform(delete("/api/leads/{id}", lead.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lead> leadList = leadRepository.findAll();
        assertThat(leadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lead.class);
        Lead lead1 = new Lead();
        lead1.setId(1L);
        Lead lead2 = new Lead();
        lead2.setId(lead1.getId());
        assertThat(lead1).isEqualTo(lead2);
        lead2.setId(2L);
        assertThat(lead1).isNotEqualTo(lead2);
        lead1.setId(null);
        assertThat(lead1).isNotEqualTo(lead2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LeadDTO.class);
        LeadDTO leadDTO1 = new LeadDTO();
        leadDTO1.setId(1L);
        LeadDTO leadDTO2 = new LeadDTO();
        assertThat(leadDTO1).isNotEqualTo(leadDTO2);
        leadDTO2.setId(leadDTO1.getId());
        assertThat(leadDTO1).isEqualTo(leadDTO2);
        leadDTO2.setId(2L);
        assertThat(leadDTO1).isNotEqualTo(leadDTO2);
        leadDTO1.setId(null);
        assertThat(leadDTO1).isNotEqualTo(leadDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(leadMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(leadMapper.fromId(null)).isNull();
    }
}
