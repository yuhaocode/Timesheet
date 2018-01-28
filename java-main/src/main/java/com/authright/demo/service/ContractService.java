package com.authright.demo.service;


import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;

import java.util.List;
import java.util.Set;

public interface ContractService {
//    Contract getContractByCompanyNameAndUser(String companyName, User user);
    Set<Contract> getContractSetByUser(User user);
    List<Contract> getContractListByCompanyName(String companyName);
    Contract addContract(Contract contract);
    Contract findContractById(Long id);
}
