package com.Interview.Platform.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "institutes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Institute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String instituteName;

    @Column(nullable = false)
    private String universityAffiliation;

    @Column(nullable = false, unique = true)
    private String instituteCode;

    @Column(nullable = false)
    private String campusAddress;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    private String website;

    private Integer totalStudents;

    // Admin/User who created institute
    //TPO user (login account)
    @OneToOne
    @JoinColumn(name = "user_id",nullable = false, unique = true)
    private User tpo;

    @Column(nullable = false, updatable = false)
    private LocalDateTime registeredAt;

    @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Department> departments;

    @PrePersist
    protected void onRegister() {
        this.registeredAt = LocalDateTime.now();
    }
}

