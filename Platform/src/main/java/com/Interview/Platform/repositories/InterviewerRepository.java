package com.Interview.Platform.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Interview.Platform.entities.Interviewer;

public interface InterviewerRepository extends JpaRepository<Interviewer,Long> {

}
