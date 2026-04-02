package com.Interview.Platform.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Interview.Platform.dtos.request.InterviewerRegisterDTO;
import com.Interview.Platform.services.InterviewerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
@CrossOrigin
public class InterviewerController {
    private final InterviewerService interviewerService;

    @PostMapping("/interviewer")
    public String registerInterviewer(@ModelAttribute InterviewerRegisterDTO dto){

        return interviewerService.registerInterviewer(dto);

    }

}
