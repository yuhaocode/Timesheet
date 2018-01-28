package com.authright.demo.controller;


import com.authright.demo.entity.User;
import com.authright.demo.entity.WeekTime;
import com.authright.demo.repository.UserRepository;
import com.authright.demo.security.auth.JwtAuthenticationToken;
import com.authright.demo.security.model.UserContext;
import com.authright.demo.service.UserService;
import com.authright.demo.utility.SecurityUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class AdminController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "modifyFromAdmin", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity modifyUserFromAdmin(@RequestBody HashMap<String, Object> mapper){
        Long userId = Long.parseLong(String.valueOf(mapper.get("userId")));
        User user = userService.findById(userId);
        if(user == null){
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        }
        String password = (String) mapper.get("password");
        if(password != null && password.length() != 0) {
            BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
            user.setPassword(passwordEncoder.encode(password));
        }
        String email = (String) mapper.get("email");
        if(email != null && email.length() != 0){
            user.setEmail(email);
        }

        String firstName = (String) mapper.get("firstName");
        if(firstName != null && firstName.length() != 0) {
            user.setFirstName(firstName);
        }

        String lastName = (String) mapper.get("lastName");
        if(lastName != null && lastName.length() != 0) {
            user.setLastName(lastName);
        }

        String username = (String) mapper.get("username");
        if(username != null && username.length() != 0) {
            user.setUsername(username);
        }
        userService.modifyUser(user);
        return new ResponseEntity(user, HttpStatus.OK);
    }


//
//    @RequestMapping(value = "fetchAllWeektime", method = RequestMethod.POST)
//    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
//    public List<WeekTime> fetchAllWeektime(){
//        JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
//        User user = userService.getUserByUsername(((UserContext) auth.getPrincipal()).getUsername());
//    }

}
