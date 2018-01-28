package com.authright.demo.controller;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;
import com.authright.demo.entity.UserRole;
import com.authright.demo.entity.WeekTime;
import com.authright.demo.repository.UserRepository;
import com.authright.demo.security.auth.JwtAuthenticationToken;
import com.authright.demo.security.model.UserContext;
import com.authright.demo.service.ContractService;
import com.authright.demo.service.UserService;
import com.authright.demo.service.WeekTimeService;
import com.authright.demo.utility.MailConstructor;
import com.authright.demo.utility.SecurityUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
///api/user/modify for all user edit
//api/user/enable for enable
//http://localhost:8080/api/user/fetchAllUser for fetch lower level user

//user test, reserve for admin user control
@RestController
@RequestMapping("/api/user")
public class UserController {
    static List<String> authenticationOrder = Arrays.asList("ROLE_ADMIN","ROLE_MANAGER","ROLE_USER");
    @Autowired
    private UserService userService;


    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private MailSender mailSender;

    @Autowired
    private ContractService contractService;
    @Autowired
    private WeekTimeService weekTimeService;

    @RequestMapping(method = RequestMethod.GET)
    public User getCurrentUserInfo() {
        JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByUsername(((UserContext) auth.getPrincipal()).getUsername());
        return user;
    }


        @RequestMapping(method = RequestMethod.POST)
        @PreAuthorize("hasRole('ROLE_ADMIN')")
        public User createUser(@RequestBody HashMap<String, Object> mapper) {
            User user = new User();
            user.setPassword((String)mapper.get("password"));
            user.setFirstName((String) mapper.get("firstName"));
            user.setLastName((String) mapper.get("lastName"));
            user.setEmail((String) mapper.get("email"));
            user.setUsername((String) mapper.get("username"));

            return userService.createUser(user);
        }


    @RequestMapping("/{username}")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public String deleteUserByUsername(@RequestBody String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) return "Cannot find username " + username;
        userService.deleteUser(user);
        return "Successfully deleted " + username;
    }

    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST)
    public ResponseEntity forgetPasswordPost(
            @RequestBody HashMap<String, String> map) throws Exception{
        User user = userService.findUserByEmail(map.get("email"));

        if(user == null){
            return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
        }

        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);

        user.setPassword((encryptedPassword));

        userService.modifyUser(user);
        SimpleMailMessage newEmail = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(newEmail);

        return new ResponseEntity("Email Sent!", HttpStatus.OK);
    }

    //Admin modify func
    @RequestMapping(value = "/fetchAllUsers", method = RequestMethod.GET)
    public List<User> fetchAllUser(){
        JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByUsername(((UserContext) auth.getPrincipal()).getUsername());

        List<User> userList =  userService.fetchTeam(user, authenticationOrder);
        return userList;
    }
//    @RequestBody HashMap<String, Object> mapper
    @RequestMapping(value = "/fetchAllWeektimeAndContract/{userId}", method = RequestMethod.POST)
//    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    public Map<String, Collection> fetchAllThing(@PathVariable("userId") int userId){
        JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User userOwn = userService.getUserByUsername(((UserContext) auth.getPrincipal()).getUsername());
        User user = userService.findById(new Long(userId));
        if(!validAuthenticate(userOwn, user)){
            return null;
        }

        List<Contract> contractList = new ArrayList<>(contractService.getContractSetByUser(user));
        List<WeekTime> weekTimeList = new ArrayList<>(weekTimeService.getWeekTimeSetByUser(user));
        weekTimeList.sort(new Comparator<WeekTime>() {
            @Override
            public int compare(WeekTime o1, WeekTime o2) {
                return (int) (o1.getWeekId() - o2.getWeekId());
            }
        });
        Map<String, Collection> map = new HashMap<>();
        map.put("contracts", contractList);
        map.put("weekTimes", weekTimeList);
        System.out.print(2);
        return map;

    }


    //for user own
    @RequestMapping(value = "modify", method = RequestMethod.POST)
    public ResponseEntity modifyUserInfo(@RequestBody HashMap<String, Object> mapper){
        JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        System.out.print(((UserContext) auth.getPrincipal()).getUsername());
        User userNeedUpdate = userService.getUserByUsername(((UserContext) auth.getPrincipal()).getUsername());

        String currentPassword = (String) mapper.get("password");

        BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
        String dbPassword = userNeedUpdate.getPassword();

        if(currentPassword != null && currentPassword.length() != 0){
            if (passwordEncoder.matches(currentPassword, dbPassword)) {
                String newPassword = (String) mapper.get("newPassword");
                if(newPassword!= null && newPassword.length() != 0){
                    userNeedUpdate.setPassword(passwordEncoder.encode(newPassword));
                }
                else{
                    return new ResponseEntity("Need to input new password", HttpStatus.BAD_REQUEST);
                }
            }
            else{
                return new ResponseEntity("Password isn't match", HttpStatus.BAD_REQUEST);
            }
        }

        String email = (String) mapper.get("email");
        if(email != null && email.length() != 0){
            userNeedUpdate.setEmail(email);
        }

        String firstName = (String) mapper.get("firstName");
        if(firstName != null && firstName.length() != 0) {
            userNeedUpdate.setFirstName(firstName);
        }

        String lastName = (String) mapper.get("lastName");
        if(lastName != null && lastName.length() != 0) {
            userNeedUpdate.setLastName(lastName);
        }

//        String username = (String) mapper.get("username");
//        if(username != null && username.length() != 0) {
//            userNeedUpdate.setUsername(username);
//        }
        userService.modifyUser(userNeedUpdate);
        return new ResponseEntity<>(userNeedUpdate,HttpStatus.OK);
    }

    //for user enable
    @RequestMapping(value = "enable", method = RequestMethod.POST)
    public String changeEnable(){
        JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByUsername(((UserContext) auth.getPrincipal()).getUsername());
        user.setEnabled(!user.isEnabled());
        userService.modifyUser(user);
        return "Successfully enabled / disabled";
    }

    private boolean validAuthenticate(User user, User user1){

        int userAuth = authenticationOrder.size() - 1;
        for(UserRole userRole : user.getUserRoles()){
            if(!authenticationOrder.contains(userRole.getRole().getName())){
                return false;
            }
            userAuth = Math.min(userAuth , authenticationOrder.indexOf(userRole.getRole().getName()));
        }

        int userAuth1 = authenticationOrder.size() - 1;
        for(UserRole userRole : user1.getUserRoles()){
            if(!authenticationOrder.contains(userRole.getRole().getName())){
                return false;
            }
            userAuth1 = Math.min(userAuth1 , authenticationOrder.indexOf(userRole.getRole().getName()));
        }
        return (userAuth < userAuth1);
    }




}
