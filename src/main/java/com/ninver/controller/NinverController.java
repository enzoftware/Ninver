package com.ninver.controller;

import com.ninver.constants.Actions;
import com.ninver.entities.Log;
import com.ninver.entities.Usuario;
import com.ninver.service.interf.ILogService;
import com.ninver.service.interf.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
public class NinverController {

    @Autowired
    private IUsuarioService servicioUsuario;

    @Autowired
    private ILogService servicioLog;

    Usuario usuarioObj;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String home(Model model){
        usuarioObj = new Usuario();
        model.addAttribute("usuario",usuarioObj);
        return "index";
    }

    @RequestMapping(value = "/french_method", method = RequestMethod.GET)
    public String login(@RequestParam("correo") String correo, @RequestParam("contrasena") String contrasena , RedirectAttributes redirAtt , Model model){
        System.out.println(correo+" "+contrasena);
        Usuario user = servicioUsuario.buscarPorEmail(correo);
        if(user != null){
            if(user.getContrasena().equals(contrasena)){
                System.out.println("USUARIO LOGEADO CORRECTAMENTE");
                usuarioObj = user;
                Log log = new Log();
                log.setUsuario(usuarioObj);
                log.setAccion_id(Actions.SING_IN.getLevelCode());
                Boolean flag = servicioLog.agregarLog(log);
                if(flag){
                    System.out.println("EL USUARIO "+usuarioObj.getId()+" HA INCIADO SESION");
                }else{
                    System.out.println("Algo salio mal!");
                }
                model.addAttribute("nombre",usuarioObj.getNombres());
                model.addAttribute("apellido",usuarioObj.getApellidos());
                return "french_method";
            }else {
                System.out.println("CONTRASEÑA INCORRECTA");
                // TODO :  ENVIAR MENSAJE DE CONTRASEÑA INCORRECTA
                return "redirect:/";
            }
        }else{
            System.out.println("OBJETO NULO");
            //TODO:  ENVIAR MENSAJE DE NO HAY USUARIO , DEBERIAS REGISTRARTE
            return "redirect:/";
        }
    }

    @RequestMapping(value = "/french_method", method = RequestMethod.POST)
    public String register(@ModelAttribute @Valid Usuario objUsuario, Model model){
        usuarioObj = objUsuario;
        Log log = new Log();
        log.setUsuario(usuarioObj);
        log.setAccion_id(Actions.SING_UP.getLevelCode());
        Boolean flag = servicioUsuario.agregar(objUsuario);
        Boolean flag2 = servicioLog.agregarLog(log);
        if(flag && flag2){
            System.out.println("EL USUARIO "+usuarioObj.getId()+" SE HA REGISTRADO");
        }else{
            System.out.println("Algo salio mal!");
        }
        model.addAttribute("nombre",usuarioObj.getNombres());
        model.addAttribute("apellido",usuarioObj.getApellidos());
        return "french_method";
    }

    @RequestMapping(value = "/pdf",method = RequestMethod.POST)
    public void generatePdf(){
        Log log = new Log();
        log.setUsuario(usuarioObj);
        log.setAccion_id(Actions.PDF.getLevelCode());
        Boolean flag = servicioLog.agregarLog(log);
        if(flag){
            System.out.println("EL USUARIO "+usuarioObj.getId()+" HA GENERADO UN PDF");
        }else{
            System.out.println("Algo salio mal!");
        }
    }

    @RequestMapping(value = "/recalcular",method = RequestMethod.POST)
    public void recalcular(){
        Log log = new Log();
        log.setUsuario(usuarioObj);
        log.setAccion_id(Actions.RECALCULATE.getLevelCode());
        Boolean flag = servicioLog.agregarLog(log);
        if(flag){
            System.out.println("EL USUARIO "+usuarioObj.getId()+" HA RECALCULADO");
        }else{
            System.out.println("Algo salio mal!");
        }
    }

    @RequestMapping(value = "/reiniciar",method = RequestMethod.POST)
    public void otraVez(){
        Log log = new Log();
        log.setUsuario(usuarioObj);
        log.setAccion_id(Actions.REINICIAR.getLevelCode());
        Boolean flag = servicioLog.agregarLog(log);
        if(flag){
            System.out.println("EL USUARIO "+usuarioObj.getId()+" HA REINICIADO");
        }else{
            System.out.println("Algo salio mal!");
        }
    }

    @RequestMapping(value = "/calcular",method = RequestMethod.POST)
    public void calcular(){
        Log log = new Log();
        log.setUsuario(usuarioObj);
        log.setAccion_id(Actions.CALCULATE.getLevelCode());
        Boolean flag = servicioLog.agregarLog(log);
        if(flag){
            System.out.println("EL USUARIO "+usuarioObj.getId()+" HA CALCULADO");
        }else{
            System.out.println("Algo salio mal!");
        }
    }
}
