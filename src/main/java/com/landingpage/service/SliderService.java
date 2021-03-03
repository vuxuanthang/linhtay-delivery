package com.landingpage.service;

import com.landingpage.service.dto.SliderDTO;
import java.util.List;

/**
 * Service Interface for managing Slider.
 */
public interface SliderService {

    /**
     * Save a slider.
     *
     * @param sliderDTO the entity to save
     * @return the persisted entity
     */
    SliderDTO save(SliderDTO sliderDTO);

    /**
     * Get all the sliders.
     *
     * @return the list of entities
     */
    List<SliderDTO> findAll();

    /**
     * Get the "id" slider.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SliderDTO findOne(Long id);

    /**
     * Delete the "id" slider.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
