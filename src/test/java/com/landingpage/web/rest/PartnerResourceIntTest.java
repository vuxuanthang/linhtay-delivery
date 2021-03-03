package com.landingpage.web.rest;

import com.landingpage.CallCrmApp;

import com.landingpage.domain.Partner;
import com.landingpage.repository.PartnerRepository;
import com.landingpage.service.dto.PartnerDTO;
import com.landingpage.service.mapper.PartnerMapper;
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
 * Test class for the PartnerResource REST controller.
 *
 * @see PartnerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CallCrmApp.class)
public class PartnerResourceIntTest {

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

    private static final String DEFAULT_USER_CODE = "AAAAAAAAAA";
    private static final String UPDATED_USER_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_ON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_ON = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private PartnerMapper partnerMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPartnerMockMvc;

    private Partner partner;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartnerResource partnerResource = new PartnerResource(partnerRepository, partnerMapper);
        this.restPartnerMockMvc = MockMvcBuilders.standaloneSetup(partnerResource)
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
    public static Partner createEntity(EntityManager em) {
        Partner partner = new Partner()
            .fullName(DEFAULT_FULL_NAME)
            .isContact(DEFAULT_IS_CONTACT)
            .mobilePhone(DEFAULT_MOBILE_PHONE)
            .email(DEFAULT_EMAIL)
            .address(DEFAULT_ADDRESS)
            .userCode(DEFAULT_USER_CODE)
            .createdOn(DEFAULT_CREATED_ON);
        return partner;
    }

    @Before
    public void initTest() {
        partner = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartner() throws Exception {
        int databaseSizeBeforeCreate = partnerRepository.findAll().size();

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);
        restPartnerMockMvc.perform(post("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isCreated());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeCreate + 1);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testPartner.getIsContact()).isEqualTo(DEFAULT_IS_CONTACT);
        assertThat(testPartner.getMobilePhone()).isEqualTo(DEFAULT_MOBILE_PHONE);
        assertThat(testPartner.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPartner.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testPartner.getUserCode()).isEqualTo(DEFAULT_USER_CODE);
        assertThat(testPartner.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
    }

    @Test
    @Transactional
    public void createPartnerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partnerRepository.findAll().size();

        // Create the Partner with an existing ID
        partner.setId(1L);
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartnerMockMvc.perform(post("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPartners() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get all the partnerList
        restPartnerMockMvc.perform(get("/api/partners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partner.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME.toString())))
            .andExpect(jsonPath("$.[*].isContact").value(hasItem(DEFAULT_IS_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].mobilePhone").value(hasItem(DEFAULT_MOBILE_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].userCode").value(hasItem(DEFAULT_USER_CODE.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())));
    }

    @Test
    @Transactional
    public void getPartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get the partner
        restPartnerMockMvc.perform(get("/api/partners/{id}", partner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partner.getId().intValue()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME.toString()))
            .andExpect(jsonPath("$.isContact").value(DEFAULT_IS_CONTACT.toString()))
            .andExpect(jsonPath("$.mobilePhone").value(DEFAULT_MOBILE_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.userCode").value(DEFAULT_USER_CODE.toString()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartner() throws Exception {
        // Get the partner
        restPartnerMockMvc.perform(get("/api/partners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Update the partner
        Partner updatedPartner = partnerRepository.findOne(partner.getId());
        // Disconnect from session so that the updates on updatedPartner are not directly saved in db
        em.detach(updatedPartner);
        updatedPartner
            .fullName(UPDATED_FULL_NAME)
            .isContact(UPDATED_IS_CONTACT)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .email(UPDATED_EMAIL)
            .address(UPDATED_ADDRESS)
            .userCode(UPDATED_USER_CODE)
            .createdOn(UPDATED_CREATED_ON);
        PartnerDTO partnerDTO = partnerMapper.toDto(updatedPartner);

        restPartnerMockMvc.perform(put("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testPartner.getIsContact()).isEqualTo(UPDATED_IS_CONTACT);
        assertThat(testPartner.getMobilePhone()).isEqualTo(UPDATED_MOBILE_PHONE);
        assertThat(testPartner.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPartner.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testPartner.getUserCode()).isEqualTo(UPDATED_USER_CODE);
        assertThat(testPartner.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPartnerMockMvc.perform(put("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isCreated());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);
        int databaseSizeBeforeDelete = partnerRepository.findAll().size();

        // Get the partner
        restPartnerMockMvc.perform(delete("/api/partners/{id}", partner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Partner.class);
        Partner partner1 = new Partner();
        partner1.setId(1L);
        Partner partner2 = new Partner();
        partner2.setId(partner1.getId());
        assertThat(partner1).isEqualTo(partner2);
        partner2.setId(2L);
        assertThat(partner1).isNotEqualTo(partner2);
        partner1.setId(null);
        assertThat(partner1).isNotEqualTo(partner2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartnerDTO.class);
        PartnerDTO partnerDTO1 = new PartnerDTO();
        partnerDTO1.setId(1L);
        PartnerDTO partnerDTO2 = new PartnerDTO();
        assertThat(partnerDTO1).isNotEqualTo(partnerDTO2);
        partnerDTO2.setId(partnerDTO1.getId());
        assertThat(partnerDTO1).isEqualTo(partnerDTO2);
        partnerDTO2.setId(2L);
        assertThat(partnerDTO1).isNotEqualTo(partnerDTO2);
        partnerDTO1.setId(null);
        assertThat(partnerDTO1).isNotEqualTo(partnerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(partnerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(partnerMapper.fromId(null)).isNull();
    }
}
