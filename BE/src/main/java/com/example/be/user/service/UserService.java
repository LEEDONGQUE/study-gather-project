package com.example.be.user.service;

import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;

public interface UserService {
    void signUp(SignUpRequestDto requestDto);
    UserResponseDto getUserInfo(Long userId);
    // 로그인 등 다른 메서드 시그니처 추가
}
