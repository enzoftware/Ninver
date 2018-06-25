package com.ninver.service.implent;

import com.ninver.entities.Usuario;
import com.ninver.repository.IUsuarioRepository;
import com.ninver.service.interf.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class UsuarioService implements IUsuarioService {
    @Autowired
    IUsuarioRepository repo;

    @Override
    public Boolean agregar(Usuario obj) {
        Usuario objUsuario = repo.save(obj);
        if(objUsuario == null){
            return false;
        }else {
            return true;
        }
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        Usuario user = repo.findByEmail(email);
        if (user != null) {
            System.out.println(user.getNombres());
            return user;
        }else{
            System.out.println("ALGO SALIO MAL");
            return null;
        }
    }
}