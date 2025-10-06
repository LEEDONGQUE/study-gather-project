package com.example.be.user.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import com.example.be.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users") // 클래스 레벨에서 공통 URL 경로 설정
public class UserController {

    private final UserService userService;

    // 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        userService.signUp(requestDto);
        // API 명세서에 따라 성공 응답을 반환합니다.
        // HttpStatus.OK (200) 대신 HttpStatus.CREATED (201)를 사용하여 리소스 생성을 명시할 수도 있습니다.
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("회원 가입이 완료되었습니다.", null));
    }

    // 회원 정보 조회 API
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<UserResponseDto>> getUserInfo(@PathVariable Long userId) {
        UserResponseDto userDto = userService.getUserInfo(userId);
        return ResponseEntity.ok(ApiResponseDto.success("회원 정보 조회 성공", userDto));
    }

    // 로그인 API (추후 구현)
    // @PostMapping("/login")
    // public ResponseEntity<ApiResponseDto<?>> login() {
    //     // 로그인 로직 구현
    //     return null;
    // }

    // 불필요하거나 중복되는 URL 매핑을 제거하여 코드를 정리했습니다.
}
