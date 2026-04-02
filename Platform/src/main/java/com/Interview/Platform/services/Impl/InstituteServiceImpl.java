package com.Interview.Platform.services.Impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Interview.Platform.dtos.request.InstituteRegisterDTO;
import com.Interview.Platform.entities.Institute;
import com.Interview.Platform.entities.User;
import com.Interview.Platform.enums.Role;
import com.Interview.Platform.enums.Status;
import com.Interview.Platform.repositories.InstituteRepository;
import com.Interview.Platform.repositories.UserRepository;
import com.Interview.Platform.services.InstituteService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class InstituteServiceImpl implements InstituteService {

    private final UserRepository userRepository;
    private final InstituteRepository instituteRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public void registerInstitute(InstituteRegisterDTO dto) {

        // 1. Password match check
        if (!dto.password().equals(dto.confirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        // 2. Email already exists check
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (instituteRepository.existsByInstituteCode(dto.instituteCode())) {
    throw new RuntimeException("Institute code already exists");
}

        // 3. Create User (TPO/Admin)
        User user = new User();
        user.setName(dto.adminName());
        user.setEmail(dto.email());
        user.setPhone(dto.contactNumber());

        // TEMP: later we hash password
        // user.setPasswordHash(dto.password());
        user.setPasswordHash(passwordEncoder.encode(dto.password()));

        user.setRole(Role.INSTITUTE);
        user.setStatus(Status.ACTIVE);

        // SAVE USER FIRST
        User savedUser =userRepository.save(user);

        // 4. Create Institute
        Institute institute = new Institute();
        institute.setInstituteName(dto.instituteName());
        institute.setUniversityAffiliation(dto.university());
        institute.setInstituteCode(dto.instituteCode());
        institute.setCampusAddress(dto.address());
        institute.setCity(dto.city());
        institute.setState(dto.state());
        institute.setWebsite(dto.website());
        institute.setTotalStudents(dto.studentStrength());

        // LINK USER → INSTITUTE
        institute.setTpo(savedUser);

        // SAVE INSTITUTE
        instituteRepository.save(institute);
        
    }

}
