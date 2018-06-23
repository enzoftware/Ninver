package com.ninver.service.implent;

import com.ninver.entities.Accion;
import com.ninver.repository.IAccionRepository;
import com.ninver.service.interf.IAccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccionService implements IAccionService {

    @Autowired
    IAccionRepository repo;

    @Override
    public Boolean agregarAccion(Accion accion) {
        Accion obj = repo.save(accion);
        if (obj == null) {
            return false;
        }
        else{
            return true;
        }
    }
}
