package com.Interview.Platform.services.Impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Interview.Platform.dtos.request.LoginDTO;
import com.Interview.Platform.dtos.response.LoginResponseDTO;
import com.Interview.Platform.entities.User;
import com.Interview.Platform.enums.Status;
import com.Interview.Platform.repositories.UserRepository;
import com.Interview.Platform.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public LoginResponseDTO login(LoginDTO dto) {
        // 1️⃣ Find user by email
        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // 2️⃣ Check password using BCrypt
        boolean isMatch = passwordEncoder.matches(dto.password(), user.getPasswordHash());

        if (!isMatch) {
            throw new RuntimeException("Invalid email or password");
        }

        // 3️⃣ Check user status (optional but recommended)
        if (user.getStatus() != Status.ACTIVE) {
            throw new RuntimeException("User is not active");
        }

        // 4️⃣ Return success (later replace with JWT token)
        return new LoginResponseDTO(
        user.getId(),
        user.getEmail(),
        user.getRole()
        );
    }

}
