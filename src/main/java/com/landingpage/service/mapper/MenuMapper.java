package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.MenuDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Menu and its DTO MenuDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MenuMapper extends EntityMapper<MenuDTO, Menu> {



    default Menu fromId(Long id) {
        if (id == null) {
            return null;
        }
        Menu menu = new Menu();
        menu.setId(id);
        return menu;
    }
}
