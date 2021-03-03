package com.landingpage.repository;

import com.landingpage.domain.Slider;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Slider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SliderRepository extends JpaRepository<Slider, Long> {

}
