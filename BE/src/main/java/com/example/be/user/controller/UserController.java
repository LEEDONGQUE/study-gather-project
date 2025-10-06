package com.example.be.user.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import com.example.be.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        userService.signUp(requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("회원 가입이 완료되었습니다.", null));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<UserResponseDto>> getUserInfo(@PathVariable Long userId) {
        UserResponseDto userDto = userService.getUserInfo(userId);
        return ResponseEntity.ok(ApiResponseDto.success("회원 정보 조회 성공", userDto));
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
