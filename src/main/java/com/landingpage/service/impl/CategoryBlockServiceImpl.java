package com.landingpage.service.impl;

import com.landingpage.service.CategoryBlockService;
import com.landingpage.domain.CategoryBlock;
import com.landingpage.repository.CategoryBlockRepository;
import com.landingpage.service.dto.CategoryBlockDTO;
import com.landingpage.service.mapper.CategoryBlockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CategoryBlock.
 */
@Service
@Transactional
public class CategoryBlockServiceImpl implements CategoryBlockService {

    private final Logger log = LoggerFactory.getLogger(CategoryBlockServiceImpl.class);

    private final CategoryBlockRepository categoryBlockRepository;

    private final CategoryBlockMapper categoryBlockMapper;

    public CategoryBlockServiceImpl(CategoryBlockRepository categoryBlockRepository, CategoryBlockMapper categoryBlockMapper) {
        this.categoryBlockRepository = categoryBlockRepository;
        this.categoryBlockMapper = categoryBlockMapper;
    }

    /**
     * Save a categoryBlock.
     *
     * @param categoryBlockDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CategoryBlockDTO save(CategoryBlockDTO categoryBlockDTO) {
        log.debug("Request to save CategoryBlock : {}", categoryBlockDTO);
        CategoryBlock categoryBlock = categoryBlockMapper.toEntity(categoryBlockDTO);
        categoryBlock = categoryBlockRepository.save(categoryBlock);
        return categoryBlockMapper.toDto(categoryBlock);
    }

    /**
     * Get all the categoryBlocks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CategoryBlockDTO> findAll() {
        log.debug("Request to get all CategoryBlocks");
        return categoryBlockRepository.findAll().stream()
            .map(categoryBlockMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one categoryBlock by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CategoryBlockDTO findOne(Long id) {
        log.debug("Request to get CategoryBlock : {}", id);
        CategoryBlock categoryBlock = categoryBlockRepository.findOne(id);
        return categoryBlockMapper.toDto(categoryBlock);
    }

    /**
     * Delete the categoryBlock by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CategoryBlock : {}", id);
        categoryBlockRepository.delete(id);
    }
}
