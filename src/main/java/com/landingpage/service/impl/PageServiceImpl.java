package com.landingpage.service.impl;

import com.landingpage.service.PageService;
import com.landingpage.domain.Page;
import com.landingpage.repository.PageRepository;
import com.landingpage.service.dto.PageDTO;
import com.landingpage.service.mapper.PageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Page.
 */
@Service
@Transactional
public class PageServiceImpl implements PageService {

    private final Logger log = LoggerFactory.getLogger(PageServiceImpl.class);

    private final PageRepository pageRepository;

    private final PageMapper pageMapper;

    public PageServiceImpl(PageRepository pageRepository, PageMapper pageMapper) {
        this.pageRepository = pageRepository;
        this.pageMapper = pageMapper;
    }

    /**
     * Save a page.
     *
     * @param pageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PageDTO save(PageDTO pageDTO) {
        log.debug("Request to save Page : {}", pageDTO);
        Page page = pageMapper.toEntity(pageDTO);
        page = pageRepository.save(page);
        return pageMapper.toDto(page);
    }

    /**
     * Get all the pages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PageDTO> findAll() {
        log.debug("Request to get all Pages");
        return pageRepository.findAll().stream()
            .map(pageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one page by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PageDTO findOne(Long id) {
        log.debug("Request to get Page : {}", id);
        Page page = pageRepository.findOne(id);
        return pageMapper.toDto(page);
    }

    /**
     * Delete the page by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Page : {}", id);
        pageRepository.delete(id);
    }
}
