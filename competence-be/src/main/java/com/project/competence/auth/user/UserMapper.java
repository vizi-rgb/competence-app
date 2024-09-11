package com.project.competence.auth.user;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User registerUserRequestToUser(String username, String password);

    UserResource userToUserResource(User user);
}
