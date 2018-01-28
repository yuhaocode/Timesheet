package com.authright.demo.service.implement;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;
import com.authright.demo.repository.ContractRepository;
import com.authright.demo.service.ContractService;
import com.authright.demo.service.WeekTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ContractServiceImp implements ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private WeekTimeService weekTimeService;


//    @Override
//    public Contract getContractByCompanyNameAndUser(String companyName, User user) {
//        return contractRepository.getContractByCompanyNameAndUser(companyName, user);
//    }

    @Override
    public Set<Contract> getContractSetByUser(User user) {
        Set<Contract> contractSet = contractRepository.getContractsByUser(user);
        return contractSet;
    }

    @Override
    public List<Contract> getContractListByCompanyName(String companyName) {
        return contractRepository.getContractsByCompanyName(companyName);
    }

    @Override
    public Contract addContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public Contract findContractById(Long id) {
        return contractRepository.findOne(id);
    }
}
