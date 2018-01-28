package com.authright.demo.controller;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.User;
import com.authright.demo.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/contract")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @RequestMapping("/create")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public Contract createContract(@RequestBody Contract contract, @RequestBody User user){
        contract.setUser(user);
        return contractService.addContract(contract);
    }
}
