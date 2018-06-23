package com.ninver.service.interf;

import com.ninver.entities.Usuario;
import org.springframework.stereotype.Service;


public interface IUsuarioService {
     Boolean agregar(Usuario obj);
     Boolean buscarPorEmail(String email);
}
