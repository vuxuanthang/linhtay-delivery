package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.PageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Page and its DTO PageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PageMapper extends EntityMapper<PageDTO, Page> {



    default Page fromId(Long id) {
        if (id == null) {
            return null;
        }
        Page page = new Page();
        page.setId(id);
        return page;
    }
}
