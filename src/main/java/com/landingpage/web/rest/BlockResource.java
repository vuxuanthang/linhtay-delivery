package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landingpage.service.BlockService;
import com.landingpage.web.rest.errors.BadRequestAlertException;
import com.landingpage.web.rest.util.HeaderUtil;
import com.landingpage.service.dto.BlockDTO;
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
 * REST controller for managing Block.
 */
@RestController
@RequestMapping("/api")
public class BlockResource {

    private final Logger log = LoggerFactory.getLogger(BlockResource.class);

    private static final String ENTITY_NAME = "block";

    private final BlockService blockService;

    public BlockResource(BlockService blockService) {
        this.blockService = blockService;
    }

    /**
     * POST  /blocks : Create a new block.
     *
     * @param blockDTO the blockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blockDTO, or with status 400 (Bad Request) if the block has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blocks")
    @Timed
    public ResponseEntity<BlockDTO> createBlock(@RequestBody BlockDTO blockDTO) throws URISyntaxException {
        log.debug("REST request to save Block : {}", blockDTO);
        if (blockDTO.getId() != null) {
            throw new BadRequestAlertException("A new block cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlockDTO result = blockService.save(blockDTO);
        return ResponseEntity.created(new URI("/api/blocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blocks : Updates an existing block.
     *
     * @param blockDTO the blockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blockDTO,
     * or with status 400 (Bad Request) if the blockDTO is not valid,
     * or with status 500 (Internal Server Error) if the blockDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blocks")
    @Timed
    public ResponseEntity<BlockDTO> updateBlock(@RequestBody BlockDTO blockDTO) throws URISyntaxException {
        log.debug("REST request to update Block : {}", blockDTO);
        if (blockDTO.getId() == null) {
            return createBlock(blockDTO);
        }
        BlockDTO result = blockService.save(blockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blocks : get all the blocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of blocks in body
     */
    @GetMapping("/blocks")
    @Timed
    public List<BlockDTO> getAllBlocks() {
        log.debug("REST request to get all Blocks");
        return blockService.findAll();
        }

    /**
     * GET  /blocks/:id : get the "id" block.
     *
     * @param id the id of the blockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/blocks/{id}")
    @Timed
    public ResponseEntity<BlockDTO> getBlock(@PathVariable Long id) {
        log.debug("REST request to get Block : {}", id);
        BlockDTO blockDTO = blockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blockDTO));
    }

    /**
     * DELETE  /blocks/:id : delete the "id" block.
     *
     * @param id the id of the blockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlock(@PathVariable Long id) {
        log.debug("REST request to delete Block : {}", id);
        blockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
