package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landingpage.domain.Partner;

import com.landingpage.repository.PartnerRepository;
import com.landingpage.web.rest.errors.BadRequestAlertException;
import com.landingpage.web.rest.util.HeaderUtil;
import com.landingpage.web.rest.util.PaginationUtil;
import com.landingpage.service.dto.PartnerDTO;
import com.landingpage.service.mapper.PartnerMapper;
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
 * REST controller for managing Partner.
 */
@RestController
@RequestMapping("/api")
public class PartnerResource {

    private final Logger log = LoggerFactory.getLogger(PartnerResource.class);

    private static final String ENTITY_NAME = "partner";

    private final PartnerRepository partnerRepository;

    private final PartnerMapper partnerMapper;

    public PartnerResource(PartnerRepository partnerRepository, PartnerMapper partnerMapper) {
        this.partnerRepository = partnerRepository;
        this.partnerMapper = partnerMapper;
    }

    /**
     * POST  /partners : Create a new partner.
     *
     * @param partnerDTO the partnerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partnerDTO, or with status 400 (Bad Request) if the partner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/partners")
    @Timed
    public ResponseEntity<PartnerDTO> createPartner(@RequestBody PartnerDTO partnerDTO) throws URISyntaxException {
        log.debug("REST request to save Partner : {}", partnerDTO);
        if (partnerDTO.getId() != null) {
            throw new BadRequestAlertException("A new partner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Partner partner = partnerMapper.toEntity(partnerDTO);
        partner = partnerRepository.save(partner);
        PartnerDTO result = partnerMapper.toDto(partner);
        return ResponseEntity.created(new URI("/api/partners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /partners : Updates an existing partner.
     *
     * @param partnerDTO the partnerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partnerDTO,
     * or with status 400 (Bad Request) if the partnerDTO is not valid,
     * or with status 500 (Internal Server Error) if the partnerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/partners")
    @Timed
    public ResponseEntity<PartnerDTO> updatePartner(@RequestBody PartnerDTO partnerDTO) throws URISyntaxException {
        log.debug("REST request to update Partner : {}", partnerDTO);
        if (partnerDTO.getId() == null) {
            return createPartner(partnerDTO);
        }
        Partner partner = partnerMapper.toEntity(partnerDTO);
        partner = partnerRepository.save(partner);
        PartnerDTO result = partnerMapper.toDto(partner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partnerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /partners : get all the partners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of partners in body
     */
    @GetMapping("/partners")
    @Timed
    public ResponseEntity<List<PartnerDTO>> getAllPartners(Pageable pageable) {
        log.debug("REST request to get a page of Partners");
        Page<Partner> page = partnerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/partners");
        return new ResponseEntity<>(partnerMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /partners/:id : get the "id" partner.
     *
     * @param id the id of the partnerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partnerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/partners/{id}")
    @Timed
    public ResponseEntity<PartnerDTO> getPartner(@PathVariable Long id) {
        log.debug("REST request to get Partner : {}", id);
        Partner partner = partnerRepository.findOne(id);
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(partnerDTO));
    }

    /**
     * DELETE  /partners/:id : delete the "id" partner.
     *
     * @param id the id of the partnerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/partners/{id}")
    @Timed
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        log.debug("REST request to delete Partner : {}", id);
        partnerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
