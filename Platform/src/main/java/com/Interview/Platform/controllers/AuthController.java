package com.Interview.Platform.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Interview.Platform.dtos.request.LoginDTO;
import com.Interview.Platform.dtos.response.LoginResponseDTO;
import com.Interview.Platform.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO dto){
        return userService.login(dto);
    }

}
