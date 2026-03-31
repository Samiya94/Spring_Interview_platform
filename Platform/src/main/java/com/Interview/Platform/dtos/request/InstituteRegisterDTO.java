package com.Interview.Platform.dtos.request;

public record InstituteRegisterDTO(
    String instituteName,
    String university,
    String instituteCode,
    String address,
    String city,
    String state,

    String adminName,
    String designation,
    String email,
    String contactNumber,
    String website,
    Integer studentStrength,

    String password,
     String confirmPassword
) {

}
