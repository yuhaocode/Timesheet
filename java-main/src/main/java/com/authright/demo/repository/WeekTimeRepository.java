package com.authright.demo.repository;

import com.authright.demo.entity.Contract;
import com.authright.demo.entity.WeekTime;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Set;

@Transactional
public interface WeekTimeRepository extends CrudRepository<WeekTime, Long>{
    Set<WeekTime> getWeekTimesByContract(Contract contract);

    WeekTime findWeekTimeByWeekId(Long id);
}
