package com.Interview.Platform.services.Impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Interview.Platform.dtos.request.InterviewerRegisterDTO;
import com.Interview.Platform.entities.Interviewer;
import com.Interview.Platform.entities.User;
import com.Interview.Platform.enums.Role;
import com.Interview.Platform.enums.Status;
import com.Interview.Platform.repositories.InterviewerRepository;
import com.Interview.Platform.repositories.UserRepository;
import com.Interview.Platform.services.InterviewerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewerServiceImpl implements InterviewerService {

    private final UserRepository userRepository;
    private final InterviewerRepository interviewerRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public String registerInterviewer(InterviewerRegisterDTO dto) {
        //1.check email
        if(userRepository.findByEmail(dto.email()).isPresent()){
            throw new RuntimeException("Email already exists!!");
        }

        //2.save user
        User user= new User();
        user.setName(dto.fullName());
        user.setEmail(dto.email());
        user.setPhone(dto.phone());
        user.setPasswordHash(passwordEncoder.encode(dto.password()));
        user.setRole(Role.INTERVIEWER);
        user.setStatus(Status.ACTIVE);

       User savedUser= userRepository.save(user);

       //3.save interviwer
       Interviewer interviewer=new Interviewer();
       interviewer.setUser(savedUser);
       interviewer.setLocation(dto.location());
       interviewer.setJobTitle(dto.jobTitle());
       interviewer.setCompany(dto.company());
       interviewer.setExperience(dto.experience());
       interviewer.setDomain(dto.domain());
       interviewer.setQualification(dto.qualification());
       interviewer.setLinkedin(dto.linkedin());
       interviewer.setSkills(dto.skills());
       interviewer.setInterviewExperience(dto.interviewExperience());
       interviewer.setBio(dto.bio());

       // 4. Handle Image Upload
        try {
            if (dto.profilePhoto() != null && !dto.profilePhoto().isEmpty()) {

                String fileName = System.currentTimeMillis() + "_" +
                        dto.profilePhoto().getOriginalFilename();

                Path path = Paths.get("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, dto.profilePhoto().getBytes());

                interviewer.setProfilePhoto(fileName);
            }
        } catch (Exception e) {
            throw new RuntimeException("File upload failed");
        }

        interviewerRepository.save(interviewer);

        return "Interviewer registered successfully!";
    }

}
