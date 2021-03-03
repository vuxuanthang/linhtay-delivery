package com.landingpage.service;

import com.landingpage.service.dto.PageDTO;
import java.util.List;

/**
 * Service Interface for managing Page.
 */
public interface PageService {

    /**
     * Save a page.
     *
     * @param pageDTO the entity to save
     * @return the persisted entity
     */
    PageDTO save(PageDTO pageDTO);

    /**
     * Get all the pages.
     *
     * @return the list of entities
     */
    List<PageDTO> findAll();

    /**
     * Get the "id" page.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PageDTO findOne(Long id);

    /**
     * Delete the "id" page.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
