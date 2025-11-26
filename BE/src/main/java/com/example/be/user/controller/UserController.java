package com.example.be.user.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.user.dto.LoginRequestDto;
import com.example.be.user.dto.MyPageResponseDto; // import 추가
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import com.example.be.user.service.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserServiceImpl userService;

    // ... (기존 회원가입, 회원정보조회 API 유지) ...
    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        userService.signUp(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("회원 가입이 완료되었습니다.", null));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<UserResponseDto>> getUserInfo(@PathVariable Long userId) {
        UserResponseDto userDto = userService.getUserInfo(userId);
        return ResponseEntity.ok(ApiResponseDto.success("회원 정보 조회 성공", userDto));
    }

    // ==========================================
    // [신규] 마이페이지 조회 API
    // URL: GET /users/mypage
    // ==========================================
    @GetMapping("/mypage")
    public ResponseEntity<ApiResponseDto<MyPageResponseDto>> getMyPage(
            @AuthenticationPrincipal String studentNumber // 토큰에서 학번 자동 추출
    ) {
        MyPageResponseDto myPageData = userService.getMyPageInfo(studentNumber);
        return ResponseEntity.ok(ApiResponseDto.success("마이페이지 조회 성공", myPageData));
    }

    // ... (기존 로그인, 로그아웃 API 유지) ...
    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<?>> loginSubmit(@RequestBody LoginRequestDto loginRequestDto, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        log.info("[LOGIN ATTEMPT] studentNumber={}, IP={}", loginRequestDto.getStudentNumber(), ip);
        try {
            ApiResponseDto<?> response = userService.login(loginRequestDto);
            log.info("[LOGIN SUCCESS] studentNumber={}, IP={}", loginRequestDto.getStudentNumber(), ip);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            log.warn("[LOGIN FAILURE] studentNumber={}, IP={}, reason={}", loginRequestDto.getStudentNumber(), ip, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponseDto.error("SF", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDto<Void>> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponseDto.error("INVALID_TOKEN", "Authorization 헤더가 없거나 형식이 잘못되었습니다."));
        }
        String token = authHeader.substring(7);
        log.info("[LOGOUT SUCCESS] Token processed: {}", token);
        return ResponseEntity.ok(ApiResponseDto.success("로그아웃 완료되었습니다.", null));
    }
}