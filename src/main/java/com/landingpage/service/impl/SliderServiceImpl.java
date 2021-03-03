package com.landingpage.service.impl;

import com.landingpage.service.SliderService;
import com.landingpage.domain.Slider;
import com.landingpage.repository.SliderRepository;
import com.landingpage.service.dto.SliderDTO;
import com.landingpage.service.mapper.SliderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Slider.
 */
@Service
@Transactional
public class SliderServiceImpl implements SliderService {

    private final Logger log = LoggerFactory.getLogger(SliderServiceImpl.class);

    private final SliderRepository sliderRepository;

    private final SliderMapper sliderMapper;

    public SliderServiceImpl(SliderRepository sliderRepository, SliderMapper sliderMapper) {
        this.sliderRepository = sliderRepository;
        this.sliderMapper = sliderMapper;
    }

    /**
     * Save a slider.
     *
     * @param sliderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SliderDTO save(SliderDTO sliderDTO) {
        log.debug("Request to save Slider : {}", sliderDTO);
        Slider slider = sliderMapper.toEntity(sliderDTO);
        slider = sliderRepository.save(slider);
        return sliderMapper.toDto(slider);
    }

    /**
     * Get all the sliders.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SliderDTO> findAll() {
        log.debug("Request to get all Sliders");
        return sliderRepository.findAll().stream()
            .map(sliderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one slider by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SliderDTO findOne(Long id) {
        log.debug("Request to get Slider : {}", id);
        Slider slider = sliderRepository.findOne(id);
        return sliderMapper.toDto(slider);
    }

    /**
     * Delete the slider by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Slider : {}", id);
        sliderRepository.delete(id);
    }
}
