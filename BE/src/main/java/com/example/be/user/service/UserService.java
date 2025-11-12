package com.example.be.user.service;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.user.dto.LoginRequestDto;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;

public interface UserService {
    void signUp(SignUpRequestDto requestDto);
    UserResponseDto getUserInfo(Long userId);
    ApiResponseDto<?> login(LoginRequestDto requestDto);
}
