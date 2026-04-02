package com.Interview.Platform.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "index";
    }

    @GetMapping("/login")
    public String loginPage(){
        return "login";
    }

    @GetMapping("/register")
    public String registerPage(){
        return "register";
    }

    @GetMapping("/institute-dashboard")
    public String instituteDashboard(){
        return "instituteDashboard";
    }

    @GetMapping("/interviewer-dashboard")
    public String interviewerDashboard(){
        return "interviewerDashboard";
    }

    @GetMapping("/student-dashboard")
    public String studentDashboard(){
    return "studentDashboard";
}
}
