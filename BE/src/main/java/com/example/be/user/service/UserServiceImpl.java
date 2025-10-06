package com.example.be.user.service;

import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Supplier; // import 추가 필요

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // signUp 메서드는 그대로 유지
    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        // ... (기존 signUp 코드)
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserInfo(Long userId) {

        UserEntity user = null;
        try {
            user = (UserEntity) userRepository.findById(userId)
                    .orElseThrow(new Supplier<IllegalArgumentException>() {
                        @Override
                        public IllegalArgumentException get() {
                            return new IllegalArgumentException("사용자를 찾을 수 없습니다.");
                        }
                    });
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }

        return new UserResponseDto(user);
    }
}