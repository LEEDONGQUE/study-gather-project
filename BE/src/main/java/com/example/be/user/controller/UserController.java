package com.example.be.user.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.user.dto.LoginRequestDto;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import com.example.be.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
//해당 @RequiredArgsConstructor라는 어노테이션을 통해 user < service <UserService 의 인터페이스 구현체인 userServiceImpl을 주입받고 갇게됨.
@RequestMapping("/users") // 클래스 레벨에서 공통 URL 경로 설정
public class UserController {

    private final UserService userService;

    // 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        userService.signUp(requestDto);
        //클라이언트가 입력한 회원가입 정보를 SignUpRequestDto로 받아오고 해당 객체인 requestDto와 주입받은 UserService 인터페이스 구현체
        //객체와 인터페이스 구현체를 이용해서 signUp 메소드를 실행.

        //@Valid 어노테이션 --> SignUpRequestDto에 각 필드에 @NotBlank 와 같은 유효성 검사를 실행시켜주는 어노테이션임
        //유효성 실패할 경우 ? --> MethodArgumentNotValidException이 발생함.-- > 예외처리해줘야됨? -->어떻게?
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("회원 가입이 완료되었습니다.", null));
    }

    // 회원 정보 조회 API
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<UserResponseDto>> getUserInfo(@PathVariable Long userId) {
        UserResponseDto userDto = userService.getUserInfo(userId);
        return ResponseEntity.ok(ApiResponseDto.success("회원 정보 조회 성공", userDto));
    }

    /**
     * 로그인 submit
     * @param loginRequestDto 로그인 데이터 DTO
     * @return 사용자 정보
     * TODO 로깅 방식 AOP(Aspect)로 변경
     * TODO 빈 값고 불일치 exception 분리
     */
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
         // TODO 로직 구현
         return null;
     }

}
