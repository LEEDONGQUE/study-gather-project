package com.example.be.user.service;

import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Mockito 확장 기능을 사용하여 Mock 객체를 초기화합니다.
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    // @Mock: 가짜(Mock) 객체를 생성합니다. 실제 DB에 접근하지 않습니다.
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    // @InjectMocks: @Mock으로 생성된 객체들을 테스트 대상(UserServiceImpl)에 주입합니다.
    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @DisplayName("회원가입 성공 테스트")
    void signUp_success() {
        // given (테스트 준비)
        SignUpRequestDto requestDto = createSignUpRequestDto("testuser", "password123", "password123");

        // userRepository의 exists... 메서드가 호출되면 항상 false를 반환하도록 설정 (중복 없음)
        when(userRepository.existsByStudentNumber(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        // passwordEncoder.encode가 호출되면 "encodedPassword"를 반환하도록 설정
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // when (테스트 실행)
        userService.signUp(requestDto);

        // then (결과 검증)
        // userRepository.save 메서드가 한 번 호출되었는지 확인
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    @DisplayName("회원가입 실패 - 비밀번호 불일치")
    void signUp_fail_passwordMismatch() {
        // given
        SignUpRequestDto requestDto = createSignUpRequestDto("testuser", "password123", "wrongpassword");

        // when & then
        // signUp 메서드 실행 시 IllegalArgumentException이 발생하는지 확인
        assertThrows(IllegalArgumentException.class, () -> {
            userService.signUp(requestDto);
        });

        // userRepository.save가 호출되지 않았는지 확인
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("회원가입 실패 - 학번 중복")
    void signUp_fail_duplicateStudentNumber() {
        // given
        SignUpRequestDto requestDto = createSignUpRequestDto("testuser", "password123", "password123");
        when(userRepository.existsByStudentNumber(anyString())).thenReturn(true); // 학번이 이미 존재한다고 설정

        // when & then
        assertThrows(IllegalArgumentException.class, () -> {
            userService.signUp(requestDto);
        });
    }

    // 테스트 데이터 생성을 위한 헬퍼 메서드
    private SignUpRequestDto createSignUpRequestDto(String username, String password, String passwordCheck) {
        SignUpRequestDto requestDto = new SignUpRequestDto();
        requestDto.setStudentNumber("20250001");
        requestDto.setUserName(username);
        requestDto.setEmail("test@example.com");
        requestDto.setPassword(password);
        requestDto.setPasswordCheck(passwordCheck);
        return requestDto;
    }
}
