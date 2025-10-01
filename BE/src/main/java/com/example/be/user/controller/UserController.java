package com.example.be.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @GetMapping("/users/login")
    public String loginForm() {
        return "login_form";
    }

    @PostMapping("/users/login")
    public String loginSubmit() {
        return null;
    }

    @GetMapping("/users/signup")
    public String signupForm() {
        return "signup_form";
    }

    @PostMapping("/users/signup")
    public String signupSubmit() {
        return null;
    }

    @GetMapping("/users/myinfo")
    public String myInfo() {
        return "my_info";
    }

    @PostMapping("/users/change")
    public String changePasswordSubmit() {
        return null;
    }

    @PostMapping("/users/logout")
    public String logout() {
        return null;
    }
}
