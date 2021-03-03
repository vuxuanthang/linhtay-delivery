package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landingpage.service.SliderService;
import com.landingpage.web.rest.errors.BadRequestAlertException;
import com.landingpage.web.rest.util.HeaderUtil;
import com.landingpage.service.dto.SliderDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Slider.
 */
@RestController
@RequestMapping("/api")
public class SliderResource {

    private final Logger log = LoggerFactory.getLogger(SliderResource.class);

    private static final String ENTITY_NAME = "slider";

    private final SliderService sliderService;

    public SliderResource(SliderService sliderService) {
        this.sliderService = sliderService;
    }

    /**
     * POST  /sliders : Create a new slider.
     *
     * @param sliderDTO the sliderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sliderDTO, or with status 400 (Bad Request) if the slider has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sliders")
    @Timed
    public ResponseEntity<SliderDTO> createSlider(@RequestBody SliderDTO sliderDTO) throws URISyntaxException {
        log.debug("REST request to save Slider : {}", sliderDTO);
        if (sliderDTO.getId() != null) {
            throw new BadRequestAlertException("A new slider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SliderDTO result = sliderService.save(sliderDTO);
        return ResponseEntity.created(new URI("/api/sliders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sliders : Updates an existing slider.
     *
     * @param sliderDTO the sliderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sliderDTO,
     * or with status 400 (Bad Request) if the sliderDTO is not valid,
     * or with status 500 (Internal Server Error) if the sliderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sliders")
    @Timed
    public ResponseEntity<SliderDTO> updateSlider(@RequestBody SliderDTO sliderDTO) throws URISyntaxException {
        log.debug("REST request to update Slider : {}", sliderDTO);
        if (sliderDTO.getId() == null) {
            return createSlider(sliderDTO);
        }
        SliderDTO result = sliderService.save(sliderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sliderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sliders : get all the sliders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sliders in body
     */
    @GetMapping("/sliders")
    @Timed
    public List<SliderDTO> getAllSliders() {
        log.debug("REST request to get all Sliders");
        return sliderService.findAll();
        }

    /**
     * GET  /sliders/:id : get the "id" slider.
     *
     * @param id the id of the sliderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sliderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sliders/{id}")
    @Timed
    public ResponseEntity<SliderDTO> getSlider(@PathVariable Long id) {
        log.debug("REST request to get Slider : {}", id);
        SliderDTO sliderDTO = sliderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sliderDTO));
    }

    /**
     * DELETE  /sliders/:id : delete the "id" slider.
     *
     * @param id the id of the sliderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sliders/{id}")
    @Timed
    public ResponseEntity<Void> deleteSlider(@PathVariable Long id) {
        log.debug("REST request to delete Slider : {}", id);
        sliderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
