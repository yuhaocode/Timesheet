package com.authright.demo.service;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;
import com.authright.demo.entity.WeekTime;

import java.util.Set;

public interface WeekTimeService {
    WeekTime updateWeektime(WeekTime weekTime);
    WeekTime submitWeektime(WeekTime weekTime);

    WeekTime viewWeektime(WeekTime weekTime);
    WeekTime rejectWeektime(WeekTime weekTime);
//    List<WeekTime> getUnsubmittedWeekTimeListByUser(User user);
//    List<WeekTime> getSubmittedWeekTimeListByUser(User user);
    Set<WeekTime> getWeekTimeSetByContract(Contract contract);
    Set<WeekTime> getWeekTimeSetByUser(User user);
}
