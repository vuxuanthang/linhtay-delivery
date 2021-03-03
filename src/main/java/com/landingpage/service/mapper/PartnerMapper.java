package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.PartnerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Partner and its DTO PartnerDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PartnerMapper extends EntityMapper<PartnerDTO, Partner> {



    default Partner fromId(Long id) {
        if (id == null) {
            return null;
        }
        Partner partner = new Partner();
        partner.setId(id);
        return partner;
    }
}
