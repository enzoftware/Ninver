package com.ninver.service.interf;

import com.ninver.entities.Usuario;

public interface IUsuarioService {

     Boolean agregar(Usuario obj);
     Boolean buscarPorEmail(String email);
}
