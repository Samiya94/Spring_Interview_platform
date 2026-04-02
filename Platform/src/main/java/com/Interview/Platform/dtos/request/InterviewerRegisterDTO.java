package com.Interview.Platform.dtos.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public record InterviewerRegisterDTO( 
    String fullName,
    String email,
    String phone,
    String password,
    String location,
    String jobTitle,
    String company,
    String experience,
    String domain,
    String qualification,
    String linkedin,
    List<String> skills,
    String interviewExperience,
    String bio,
    MultipartFile profilePhoto
) {
    

}
