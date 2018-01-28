package com.authright.demo.service;

import com.authright.demo.entity.User;

import java.util.List;

public interface UserService {
    User createUser(User user);

    User getUserByUsername(String username);

    void deleteUser (User user);

    User modifyUser(User user);

    List<User> fetchTeam(User user, List<String> authenticationOrder);

    User findById(Long id);

    User findUserByEmail(String Email);
}
