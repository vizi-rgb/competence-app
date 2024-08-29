package com.project.competence.auth.user;

import com.project.competence.auth.exception.UserAlreadyExists;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterUserRequest registerUserRequest) {
        if (userRepository.existsByUsername(registerUserRequest.username())) {
            log.error("Username is already in use");
            throw new UserAlreadyExists(registerUserRequest.username());
        }

        final var user = userMapper.registerUserRequestToUser(
                registerUserRequest.username(),
                passwordEncoder.encode(registerUserRequest.password())
        );

        log.info("Saving employee with username {}", user.getUsername());
        return userRepository.save(user);
    }
}
