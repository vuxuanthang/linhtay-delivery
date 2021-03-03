package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landingpage.domain.Lead;

import com.landingpage.repository.LeadRepository;
import com.landingpage.web.rest.errors.BadRequestAlertException;
import com.landingpage.web.rest.util.HeaderUtil;
import com.landingpage.web.rest.util.PaginationUtil;
import com.landingpage.service.dto.LeadDTO;
import com.landingpage.service.mapper.LeadMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lead.
 */
@RestController
@RequestMapping("/api")
public class LeadResource {

    private final Logger log = LoggerFactory.getLogger(LeadResource.class);

    private static final String ENTITY_NAME = "lead";

    private final LeadRepository leadRepository;

    private final LeadMapper leadMapper;

    public LeadResource(LeadRepository leadRepository, LeadMapper leadMapper) {
        this.leadRepository = leadRepository;
        this.leadMapper = leadMapper;
    }

    /**
     * POST  /leads : Create a new lead.
     *
     * @param leadDTO the leadDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new leadDTO, or with status 400 (Bad Request) if the lead has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/leads")
    @Timed
    public ResponseEntity<LeadDTO> createLead(@RequestBody LeadDTO leadDTO) throws URISyntaxException {
        log.debug("REST request to save Lead : {}", leadDTO);
        if (leadDTO.getId() != null) {
            throw new BadRequestAlertException("A new lead cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lead lead = leadMapper.toEntity(leadDTO);
        lead = leadRepository.save(lead);
        LeadDTO result = leadMapper.toDto(lead);
        return ResponseEntity.created(new URI("/api/leads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /leads : Updates an existing lead.
     *
     * @param leadDTO the leadDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated leadDTO,
     * or with status 400 (Bad Request) if the leadDTO is not valid,
     * or with status 500 (Internal Server Error) if the leadDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/leads")
    @Timed
    public ResponseEntity<LeadDTO> updateLead(@RequestBody LeadDTO leadDTO) throws URISyntaxException {
        log.debug("REST request to update Lead : {}", leadDTO);
        if (leadDTO.getId() == null) {
            return createLead(leadDTO);
        }
        Lead lead = leadMapper.toEntity(leadDTO);
        lead = leadRepository.save(lead);
        LeadDTO result = leadMapper.toDto(lead);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, leadDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /leads : get all the leads.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of leads in body
     */
    @GetMapping("/leads")
    @Timed
    public ResponseEntity<List<LeadDTO>> getAllLeads(Pageable pageable) {
        log.debug("REST request to get a page of Leads");
        Page<Lead> page = leadRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/leads");
        return new ResponseEntity<>(leadMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /leads/:id : get the "id" lead.
     *
     * @param id the id of the leadDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the leadDTO, or with status 404 (Not Found)
     */
    @GetMapping("/leads/{id}")
    @Timed
    public ResponseEntity<LeadDTO> getLead(@PathVariable Long id) {
        log.debug("REST request to get Lead : {}", id);
        Lead lead = leadRepository.findOne(id);
        LeadDTO leadDTO = leadMapper.toDto(lead);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(leadDTO));
    }

    /**
     * DELETE  /leads/:id : delete the "id" lead.
     *
     * @param id the id of the leadDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/leads/{id}")
    @Timed
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        log.debug("REST request to delete Lead : {}", id);
        leadRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
