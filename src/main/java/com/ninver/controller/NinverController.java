package com.ninver.controller;

import com.ninver.entities.Usuario;
import com.ninver.service.interf.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
public class NinverController {

    @Autowired
    private IUsuarioService servicioUsuario;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String home(Model model){
        Usuario usuarioObj = new Usuario();
        model.addAttribute("usuario",usuarioObj);
        return "index";
    }

    @RequestMapping(value = "/french_method", method = RequestMethod.GET)
    public String login(Model model){

        return "french_method";
    }

    @RequestMapping(value = "/french_method", method = RequestMethod.POST)
    public String register(@ModelAttribute @Valid Usuario objUsuario, Model model){
        Boolean flag = servicioUsuario.agregar(objUsuario);
        if(flag){
            System.out.println("Usuario agregado");
        }else{
            System.out.println("Algo salio mal!");
        }
        return "french_method";
    }
}
