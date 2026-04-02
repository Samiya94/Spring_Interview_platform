package com.Interview.Platform.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "interviewers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interviewer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to User
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // Personal / Location
    private String location;

    // Professional Info
    @Column(name = "job_title")
    private String jobTitle;
    private String company;
    private String experience;
    private String domain;
    private String qualification;

    private String linkedin;

    // Skills (Stored in separate table automatically)
    @ElementCollection
    @CollectionTable(name = "interviewer_skills", joinColumns = @JoinColumn(name = "interviewer_id"))
    @Column(name = "skill")
    private List<String> skills;

    private String interviewExperience;

    // Bio
    @Column(length = 1000)
    private String bio;

    // Profile Photo (store URL or filename)
    private String profilePhoto;

    // Created Time
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
    }
}