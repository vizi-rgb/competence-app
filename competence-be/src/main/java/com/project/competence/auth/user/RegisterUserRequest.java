package com.project.competence.auth.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterUserRequest(
        @NotBlank
        @Email
        String username,

        @NotBlank
        String password
) {
}
