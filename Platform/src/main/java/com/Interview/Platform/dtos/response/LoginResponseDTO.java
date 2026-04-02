package com.Interview.Platform.dtos.response;

import com.Interview.Platform.enums.Role;

public record LoginResponseDTO(
    Long id,
    String email,
    Role role
) {

}
