package com.landingpage.repository;

import com.landingpage.domain.Lead;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Lead entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

}
