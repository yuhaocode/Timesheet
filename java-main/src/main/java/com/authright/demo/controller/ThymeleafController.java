package com.authright.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//thymeleaf template test
@Controller
public class ThymeleafController {
    @RequestMapping("/thymeleaf")
    public String thymeleaf(){
        return "thymeleaf";
    }
}
