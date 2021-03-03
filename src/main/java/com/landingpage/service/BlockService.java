package com.landingpage.service;

import com.landingpage.service.dto.BlockDTO;
import java.util.List;

/**
 * Service Interface for managing Block.
 */
public interface BlockService {

    /**
     * Save a block.
     *
     * @param blockDTO the entity to save
     * @return the persisted entity
     */
    BlockDTO save(BlockDTO blockDTO);

    /**
     * Get all the blocks.
     *
     * @return the list of entities
     */
    List<BlockDTO> findAll();

    /**
     * Get the "id" block.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BlockDTO findOne(Long id);

    /**
     * Delete the "id" block.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
