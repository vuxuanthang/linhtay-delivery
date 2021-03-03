package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.SliderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Slider and its DTO SliderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SliderMapper extends EntityMapper<SliderDTO, Slider> {



    default Slider fromId(Long id) {
        if (id == null) {
            return null;
        }
        Slider slider = new Slider();
        slider.setId(id);
        return slider;
    }
}
