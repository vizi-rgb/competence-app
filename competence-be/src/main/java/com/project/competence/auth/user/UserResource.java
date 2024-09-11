package com.project.competence.auth.user;

import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.UUID;

public record UserResource(
        UUID id,
        String username,
        List<? extends GrantedAuthority> authorities
) {
}
