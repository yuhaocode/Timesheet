package com.authright.demo.repository;

import com.authright.demo.entity.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

@Transactional
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
    List<User> findAll();
    User findUserByEmail(String email);

@Query(value = "select u.* from user u where u.user_id not in (select u.user_id from user u inner join user_role ur on ur.user_id=u.user_id where ur.role_id<:indexOfAuth)", nativeQuery = true)
    List<User> findAllTeam(@Param("indexOfAuth") int auth);
}

//select * from user u inner join user_role ur on ur.user_id=u.user_id where ur.role_id=1
