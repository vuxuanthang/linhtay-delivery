package com.landingpage.repository;

import com.landingpage.domain.CategoryBlock;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CategoryBlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryBlockRepository extends JpaRepository<CategoryBlock, Long> {

}
