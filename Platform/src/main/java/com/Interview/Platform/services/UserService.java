package com.Interview.Platform.services;

import com.Interview.Platform.dtos.request.LoginDTO;
import com.Interview.Platform.dtos.response.LoginResponseDTO;

public interface UserService {
    public LoginResponseDTO login(LoginDTO dto);

}
