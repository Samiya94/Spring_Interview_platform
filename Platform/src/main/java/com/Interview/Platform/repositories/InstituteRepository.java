package com.Interview.Platform.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Interview.Platform.entities.Institute;

public interface InstituteRepository extends JpaRepository<Institute, Long> {
    boolean existsByInstituteCode(String instituteCode);
}
