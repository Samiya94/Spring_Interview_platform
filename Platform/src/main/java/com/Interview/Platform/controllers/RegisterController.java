package com.Interview.Platform.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Interview.Platform.dtos.request.InstituteRegisterDTO;
import com.Interview.Platform.services.InstituteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
public class RegisterController {
    private final InstituteService instituteService;

    @PostMapping("/institute")
    public String registerInstitute(@RequestBody InstituteRegisterDTO dto){
        instituteService.registerInstitute(dto);

        return "Institute registered successfully";

    }

}
