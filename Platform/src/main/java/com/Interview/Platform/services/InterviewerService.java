package com.Interview.Platform.services;

import com.Interview.Platform.dtos.request.InterviewerRegisterDTO;

public interface InterviewerService {
    String registerInterviewer(InterviewerRegisterDTO dto);

}
