package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landingpage.service.CategoryBlockService;
import com.landingpage.web.rest.errors.BadRequestAlertException;
import com.landingpage.web.rest.util.HeaderUtil;
import com.landingpage.service.dto.CategoryBlockDTO;
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
 * REST controller for managing CategoryBlock.
 */
@RestController
@RequestMapping("/api")
public class CategoryBlockResource {

    private final Logger log = LoggerFactory.getLogger(CategoryBlockResource.class);

    private static final String ENTITY_NAME = "categoryBlock";

    private final CategoryBlockService categoryBlockService;

    public CategoryBlockResource(CategoryBlockService categoryBlockService) {
        this.categoryBlockService = categoryBlockService;
    }

    /**
     * POST  /category-blocks : Create a new categoryBlock.
     *
     * @param categoryBlockDTO the categoryBlockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoryBlockDTO, or with status 400 (Bad Request) if the categoryBlock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/category-blocks")
    @Timed
    public ResponseEntity<CategoryBlockDTO> createCategoryBlock(@RequestBody CategoryBlockDTO categoryBlockDTO) throws URISyntaxException {
        log.debug("REST request to save CategoryBlock : {}", categoryBlockDTO);
        if (categoryBlockDTO.getId() != null) {
            throw new BadRequestAlertException("A new categoryBlock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoryBlockDTO result = categoryBlockService.save(categoryBlockDTO);
        return ResponseEntity.created(new URI("/api/category-blocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /category-blocks : Updates an existing categoryBlock.
     *
     * @param categoryBlockDTO the categoryBlockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoryBlockDTO,
     * or with status 400 (Bad Request) if the categoryBlockDTO is not valid,
     * or with status 500 (Internal Server Error) if the categoryBlockDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/category-blocks")
    @Timed
    public ResponseEntity<CategoryBlockDTO> updateCategoryBlock(@RequestBody CategoryBlockDTO categoryBlockDTO) throws URISyntaxException {
        log.debug("REST request to update CategoryBlock : {}", categoryBlockDTO);
        if (categoryBlockDTO.getId() == null) {
            return createCategoryBlock(categoryBlockDTO);
        }
        CategoryBlockDTO result = categoryBlockService.save(categoryBlockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoryBlockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /category-blocks : get all the categoryBlocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categoryBlocks in body
     */
    @GetMapping("/category-blocks")
    @Timed
    public List<CategoryBlockDTO> getAllCategoryBlocks() {
        log.debug("REST request to get all CategoryBlocks");
        return categoryBlockService.findAll();
        }

    /**
     * GET  /category-blocks/:id : get the "id" categoryBlock.
     *
     * @param id the id of the categoryBlockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoryBlockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/category-blocks/{id}")
    @Timed
    public ResponseEntity<CategoryBlockDTO> getCategoryBlock(@PathVariable Long id) {
        log.debug("REST request to get CategoryBlock : {}", id);
        CategoryBlockDTO categoryBlockDTO = categoryBlockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(categoryBlockDTO));
    }

    /**
     * DELETE  /category-blocks/:id : delete the "id" categoryBlock.
     *
     * @param id the id of the categoryBlockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/category-blocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategoryBlock(@PathVariable Long id) {
        log.debug("REST request to delete CategoryBlock : {}", id);
        categoryBlockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
