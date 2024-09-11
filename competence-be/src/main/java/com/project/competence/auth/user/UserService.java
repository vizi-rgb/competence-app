package com.project.competence.auth.user;

import com.project.competence.auth.exception.UserAlreadyExists;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public UserResource register(RegisterUserRequest registerUserRequest) {
        if (userRepository.existsByUsername(registerUserRequest.email())) {
            log.error("Username is already in use");
            throw new UserAlreadyExists(registerUserRequest.email());
        }

        final var user = userMapper.registerUserRequestToUser(
                registerUserRequest.email(),
                passwordEncoder.encode(registerUserRequest.password())
        );

        log.info("Saving employee with username {}", user.getUsername());
        final var savedUser = userRepository.save(user);
        return userMapper.userToUserResource(savedUser);
    }

    @Transactional
    public UserResource login(LoginUserRequest request) {
        final var usernamePasswordAuthToken = new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
        );

        log.info("Authenticating user {}", request.email());
        authenticationManager.authenticate(usernamePasswordAuthToken);
        final var user = userRepository.findByUsername(request.email()).orElseThrow();

        log.info("Successfully authenticated user {}", user.getUsername());
        return userMapper.userToUserResource(user);
    }
}
