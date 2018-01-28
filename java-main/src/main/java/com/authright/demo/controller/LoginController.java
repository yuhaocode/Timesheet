package com.authright.demo.controller;

import com.authright.demo.security.auth.JwtAuthenticationToken;
import com.authright.demo.security.model.UserContext;
import com.authright.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//this controller is used for test with role
@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping("/access-denied")
    public String accessDenied() {
        return "Access denied! LOL! ^_^";
    }

    @RequestMapping("/app-logout")
    public ResponseEntity logout() {
        SecurityContextHolder.clearContext();
        return new ResponseEntity("Successfully logged out!", HttpStatus.OK);
    }

    @RequestMapping("/")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    public @ResponseBody UserContext home(JwtAuthenticationToken token) {
        UserContext userContext = (UserContext) token.getPrincipal();
        return userContext;
    }
}
