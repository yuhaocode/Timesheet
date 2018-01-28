package com.authright.demo.repository;

import com.authright.demo.entity.Role;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

@Transactional
public interface RoleRepository extends CrudRepository<Role, Integer> {

}
