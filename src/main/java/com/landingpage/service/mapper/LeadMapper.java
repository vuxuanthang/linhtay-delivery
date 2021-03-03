package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.LeadDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Lead and its DTO LeadDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LeadMapper extends EntityMapper<LeadDTO, Lead> {



    default Lead fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lead lead = new Lead();
        lead.setId(id);
        return lead;
    }
}
