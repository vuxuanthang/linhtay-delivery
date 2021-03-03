package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.CategoryBlockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CategoryBlock and its DTO CategoryBlockDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CategoryBlockMapper extends EntityMapper<CategoryBlockDTO, CategoryBlock> {



    default CategoryBlock fromId(Long id) {
        if (id == null) {
            return null;
        }
        CategoryBlock categoryBlock = new CategoryBlock();
        categoryBlock.setId(id);
        return categoryBlock;
    }
}
