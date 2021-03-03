package com.landingpage.service;

import com.landingpage.service.dto.CategoryBlockDTO;
import java.util.List;

/**
 * Service Interface for managing CategoryBlock.
 */
public interface CategoryBlockService {

    /**
     * Save a categoryBlock.
     *
     * @param categoryBlockDTO the entity to save
     * @return the persisted entity
     */
    CategoryBlockDTO save(CategoryBlockDTO categoryBlockDTO);

    /**
     * Get all the categoryBlocks.
     *
     * @return the list of entities
     */
    List<CategoryBlockDTO> findAll();

    /**
     * Get the "id" categoryBlock.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CategoryBlockDTO findOne(Long id);

    /**
     * Delete the "id" categoryBlock.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
