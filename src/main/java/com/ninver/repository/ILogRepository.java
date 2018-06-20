package com.ninver.repository;

import com.ninver.entities.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILogRepository extends JpaRepository<Log,Integer> {
}
