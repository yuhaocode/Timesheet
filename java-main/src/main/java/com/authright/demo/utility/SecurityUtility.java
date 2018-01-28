package com.authright.demo.utility;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

//Utilities of password encoder
@Component
public class SecurityUtility {
    private static final String SALT = "salt";
    public static final String ROLE_REFRESH_TOKEN = "ROLE_USER";

    @Bean
    public static BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(12, new SecureRandom(randomPassword().getBytes()));
    }

    @Bean
    public static String randomPassword(){
        String SALTCHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();

        while (salt.length() < 31){
            int index = (int)(rnd.nextFloat() * SALTCHAR.length());
            salt.append(SALTCHAR.charAt(index));
        }

        return salt.toString();
    }
}
