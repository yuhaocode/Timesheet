package com.authright.demo.controller;

import com.authright.demo.entity.WeekTime;
import com.authright.demo.repository.WeekTimeRepository;
import com.authright.demo.service.WeekTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weektime")
public class WeektimeController {

    @Autowired
    private WeekTimeService weekTimeService;

    @RequestMapping("/approve")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public ResponseEntity viewWeektime(@RequestBody WeekTime weekTime){
        if(weekTime.isViewed() == true || weekTime.isSubmitted() == false){
            return new ResponseEntity(weekTime, HttpStatus.BAD_REQUEST);
        }
        System.out.print(1);
        weekTimeService.viewWeektime(weekTime);
        return new ResponseEntity(weekTime, HttpStatus.OK);
    }

    @RequestMapping("/reject")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public WeekTime rejectWeektime(@RequestBody WeekTime weekTime){
        return weekTimeService.rejectWeektime(weekTime);
    }
}
