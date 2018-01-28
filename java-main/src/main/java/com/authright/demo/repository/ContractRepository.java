package com.authright.demo.repository;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface ContractRepository extends CrudRepository<Contract, Long> {
    Contract getContractByCompanyNameAndUser(String companyName, User user);
    List<Contract> getContractsByCompanyName(String companyName);
    Set<Contract> getContractsByUser(User user);
}
