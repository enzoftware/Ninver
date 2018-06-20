package com.ninver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class NinverController {

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String home(Model model){
        return "index";
    }

    @RequestMapping(value = "/french_method", method = RequestMethod.GET)
    public String login(Model model){
        return "french_method";
    }

    @RequestMapping(value = "/french_method", method = RequestMethod.POST)
    public String register(Model model){
        return "french_method";
    }



}
