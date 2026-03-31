package com.Interview.Platform.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Interview.Platform.entities.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
