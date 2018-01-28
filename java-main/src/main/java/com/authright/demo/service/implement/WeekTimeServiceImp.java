package com.authright.demo.service.implement;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;
import com.authright.demo.entity.WeekTime;
import com.authright.demo.repository.WeekTimeRepository;
import com.authright.demo.service.ContractService;
import com.authright.demo.service.WeekTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class WeekTimeServiceImp implements WeekTimeService {

    @Autowired
    private WeekTimeRepository weekTimeRepository;

    @Autowired
    private ContractService contractService;

    @Override
    public WeekTime updateWeektime(WeekTime weekTime) {
        Contract contract = contractService.findContractById(weekTime.getContractId());
        weekTime.setContract(contract);
        weekTime = weekTimeRepository.save(weekTime);
        return weekTime;
    }

    @Override
    public WeekTime submitWeektime(WeekTime weekTime) {
        Contract contract = contractService.findContractById(weekTime.getContractId());
        weekTime.setContract(contract);
        weekTime.setSubmitted(true);
        weekTime.setViewed(false);
        weekTime = weekTimeRepository.save(weekTime);
        return weekTime;
    }

    @Override
    public WeekTime viewWeektime(WeekTime weekTime) {
        System.out.print(weekTime.getContractId());
        Contract contract = contractService.findContractById(weekTime.getContractId());
        weekTime.setContract(contract);
        weekTime.setViewed(true);
        weekTime.setSubmitted(true);
        weekTime = weekTimeRepository.save(weekTime);
        return weekTime;
    }

    @Override
    public WeekTime rejectWeektime(WeekTime weekTime) {
        Contract contract = contractService.findContractById(weekTime.getContractId());
        weekTime.setContract(contract);
        weekTime.setViewed(true);
        weekTime.setSubmitted(false);
        weekTime = weekTimeRepository.save(weekTime);
        return weekTime;
    }

//    @Override
//    public List<WeekTime> getUnsubmittedWeekTimeListByUser(User user) {
//        List<WeekTime> weekTimeList = getWeekTimeListByUser(user);
//        return weekTimeList.stream().filter(weekTime -> !weekTime.isSubmitted()).collect(Collectors.toList());
//    }
//
//    @Override
//    public List<WeekTime> getSubmittedWeekTimeListByUser(User user) {
//        List<WeekTime> weekTimeList = getWeekTimeListByUser(user);
//        return weekTimeList.stream().filter(weekTime -> weekTime.isSubmitted()).collect(Collectors.toList());
//    }

    @Override
    public Set<WeekTime> getWeekTimeSetByContract(Contract contract) {
        Set<WeekTime> weekTimeSet = weekTimeRepository.getWeekTimesByContract(contract);

        Date now = new Date();
        Date startDate = contract.getStartDate();
        Date toDate = contract.getEndDate() == null ? now : (contract.getEndDate().before(now) ? contract.getEndDate() : now);

        Calendar calendar = Calendar.getInstance();
        Date latestMondayDate = new Date(startDate.getTime());
        calendar.setTime(latestMondayDate);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        calendar.add(Calendar.DATE,0 - 7 - ((dayOfWeek - 2) % 7));
        latestMondayDate = calendar.getTime();

        for(WeekTime weekTime : weekTimeSet){
            weekTime.setContractId(weekTime.getContract().getId());
            if(latestMondayDate.before(weekTime.getMondayDate()))
                latestMondayDate = weekTime.getMondayDate();
        }

        calendar.setTime(latestMondayDate);
        calendar.add(Calendar.DATE, 7);
        Date newMondayDate = calendar.getTime();
        while(newMondayDate.before(toDate)){
            WeekTime weekTime = new WeekTime();
            weekTime.setMondayDate(newMondayDate);
            weekTime.setContract(contract);
            weekTime = weekTimeRepository.save(weekTime);
            weekTime.setContractId(contract.getId());
            weekTimeSet.add(weekTime);
            calendar.add(Calendar.DATE, 7);
            newMondayDate = calendar.getTime();
        }
        return weekTimeSet;
    }

    @Override
    public Set<WeekTime> getWeekTimeSetByUser(User user) {
        Set<Contract> contractSet = contractService.getContractSetByUser(user);
        Set<WeekTime> weekTimeSet = new HashSet<WeekTime>();
        for(Contract contract: contractSet) {
            weekTimeSet.addAll(getWeekTimeSetByContract(contract));
        }
        return weekTimeSet;
    }
}
