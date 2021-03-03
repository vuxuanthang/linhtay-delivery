package com.landingpage.service.mapper;

import com.landingpage.domain.*;
import com.landingpage.service.dto.BlockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Block and its DTO BlockDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryBlockMapper.class})
public interface BlockMapper extends EntityMapper<BlockDTO, Block> {

    @Mapping(source = "categoryBlock.id", target = "categoryBlockId")
    BlockDTO toDto(Block block);

    @Mapping(source = "categoryBlockId", target = "categoryBlock")
    Block toEntity(BlockDTO blockDTO);

    default Block fromId(Long id) {
        if (id == null) {
            return null;
        }
        Block block = new Block();
        block.setId(id);
        return block;
    }
}
