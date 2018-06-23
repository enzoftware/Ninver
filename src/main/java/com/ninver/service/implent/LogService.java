package com.ninver.service.implent;

import com.ninver.entities.Log;
import com.ninver.repository.ILogRepository;
import com.ninver.service.interf.ILogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService implements ILogService {

    @Autowired
    ILogRepository repo;

    @Override
    public Boolean agregarLog(Log log) {
        Log obj = repo.save(log);
        if (obj == null){
            return false;
        }else {
            return true;
        }
    }
}
