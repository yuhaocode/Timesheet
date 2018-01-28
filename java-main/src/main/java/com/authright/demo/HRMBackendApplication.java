package com.authright.demo;

import com.authright.demo.entity.*;
import com.authright.demo.repository.RoleRepository;
import com.authright.demo.repository.UserRepository;
import com.authright.demo.service.ContractService;
import com.authright.demo.service.UserService;
import com.authright.demo.service.WeekTimeService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class HRMBackendApplication implements CommandLineRunner{

	@Autowired
	private UserService userService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private ContractService contractService;

	@Autowired
	private WeekTimeService weekTimeService;

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {

		SpringApplication.run(HRMBackendApplication.class, args);
	}

	//initial roles and users for test
	@Override
	public void run(String... strings) {
		User user = new User();
		Role role = new Role();

		role.setRoleId(1);
		role.setName("ROLE_ADMIN");
		if (roleRepository.findOne(1) == null){

			roleRepository.save(role);
		}



		if (roleRepository.findOne(2) == null){
			role.setRoleId(2);
			role.setName("ROLE_MANAGER");
			roleRepository.save(role);
		}



		if (roleRepository.findOne(3) == null){
			role.setRoleId(3);
			role.setName("ROLE_USER");
			roleRepository.save(role);
		}

		role.setRoleId(1);
		user.setUsername("admin");
		user.setPassword("admin");
		user.setFirstName("Admin");
		user.setLastName("Admin");
		user.setEmail("Admin@test.com");
		user.getUserRoles().add(new UserRole(user, role));
		userService.createUser(user);

		role.setRoleId(2);
		user.setUserId(2L);
		user.setUsername("liaoyu");
		user.setPassword("321");
		user.setFirstName("Yu");
		user.setLastName("Liao");
		user.setEmail("liaoyu9e@gmail.com");
		user.getUserRoles().clear();
		user.getUserRoles().add(new UserRole(user, role));
		userService.createUser(user);

		if(userRepository.findOne(3L) == null){
			user.setUserId(3L);
			user.setUsername("user1");
			user.setPassword("pass1");
			user.setFirstName("Chen");
			user.setLastName("Hua");
			user.setEmail("chen.hua@authright.com");
			user.getUserRoles().clear();
			userService.createUser(user);
		}


		user.setUserId(4L);
		user.setUsername("a");
		user.setPassword("a");
		user.setFirstName("c");
		user.setLastName("d");
		user.setEmail("chen.hua@authright.co");
		user.getUserRoles().clear();
		userService.createUser(user);
		if(!contractService.getContractSetByUser(user).isEmpty()){
			return;
		}

		ObjectMapper mapper = new ObjectMapper();
		try {
			List<Contract> contracts = mapper.readValue(new File("src/main/resources/static/Contracts.json"), new TypeReference<List<Contract>>(){});
			for(Contract contract : contracts){
				contract.setUser(user);
				contractService.addContract(contract);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		Set<Contract> contractSet = contractService.getContractSetByUser(user);
		ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
		try {
			writer.writeValue(new File("src/main/resources/static/ContractSet.json"), contractSet);
		} catch (IOException e) {
			e.printStackTrace();
		}

		Set<WeekTime> weekTimeSet = weekTimeService.getWeekTimeSetByUser(user);
		try {
			writer.writeValue(new File("src/main/resources/static/WeekTimeSet.json"), weekTimeSet);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}