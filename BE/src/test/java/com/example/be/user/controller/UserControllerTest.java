package com.example.be.user.controller;



import com.example.be.config.SecurityConfig;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class) // 1. UserController만 테스트 대상으로 지정
@Import(SecurityConfig.class)     // 2. SecurityConfig 임포트 (permitAll() 설정 때문)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc; // 3. HTTP 요청을 시뮬레이션하는 MockMvc

    @Autowired
    private ObjectMapper objectMapper; // 4. DTO 객체를 JSON 문자열로 변환

    @MockBean
    private UserService userService; // 5. UserController가 의존하는 UserService를 가짜(Mock)로 만듦

    @Test
    @DisplayName("회원가입 성공")
    void signUp_Success() throws Exception {
        // given (전제)
        SignUpRequestDto requestDto = new SignUpRequestDto();
        requestDto.setStudentNumber("12345678");
        requestDto.setUserName("테스트");
        requestDto.setEmail("test@example.com");
        requestDto.setPassword("password123");
        requestDto.setPasswordCheck("password123");

        String requestJson = objectMapper.writeValueAsString(requestDto);

        // 6. 서비스가 성공적으로 실행된다고 가정 (아무것도 반환하지 않음)
        doNothing().when(userService).signUp(any(SignUpRequestDto.class));

        // when (실행) & then (검증)
        mockMvc.perform(post("/users/signup") // 7. /users/signup으로 POST 요청
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated()) // 8. HTTP 201 Created 상태인지 확인
                .andExpect(jsonPath("$.code").value("OK")) // 9. 응답 JSON의 code 필드 확인
                .andExpect(jsonPath("$.message").value("회원 가입이 완료되었습니다.")); // 10. message 필드 확인
    }

    @Test
    @DisplayName("회원가입 실패 - 유효성 검사 (예: 빈 이메일)")
    void signUp_Fail_Validation() throws Exception {
        // given
        SignUpRequestDto requestDto = new SignUpRequestDto();
        requestDto.setStudentNumber("12345678");
        requestDto.setUserName("테스트");
        requestDto.setEmail(""); // 11. 유효성 검사에 실패할 빈 이메일
        requestDto.setPassword("password123");
        requestDto.setPasswordCheck("password123");

        String requestJson = objectMapper.writeValueAsString(requestDto);

        // 12. 서비스가 호출될 필요 없음 (유효성 검사에서 먼저 실패)

        // when & then
        mockMvc.perform(post("/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isBadRequest()) // 13. GlobalExceptionHandler가 400 Bad Request를 반환하는지 확인
                .andExpect(jsonPath("$.code").value("VALIDATION_FAILED")) // 14. 핸들러가 반환하는 code 확인
                .andExpect(jsonPath("$.message").value("이메일은 필수 입력 값입니다.")); // 15. DTO의 @NotBlank 메시지 확인
    }

    @Test
    @DisplayName("회원가입 실패 - 비즈니스 로직 (예: 이메일 중복)")
    void signUp_Fail_BusinessLogic() throws Exception {
        // given
        SignUpRequestDto requestDto = new SignUpRequestDto();
        requestDto.setStudentNumber("12345678");
        requestDto.setUserName("테스트");
        requestDto.setEmail("duplicate@example.com"); // 유효하지만 중복된 이메일이라고 가정
        requestDto.setPassword("password123");
        requestDto.setPasswordCheck("password123");

        String requestJson = objectMapper.writeValueAsString(requestDto);

        // 16. 서비스가 "이메일 중복" 예외를 발생시킨다고 가정
        doThrow(new IllegalArgumentException("이미 사용 중인 이메일입니다."))
                .when(userService).signUp(any(SignUpRequestDto.class));

        // when & then
        mockMvc.perform(post("/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isBadRequest()) // 17. GlobalExceptionHandler가 400 Bad Request를 반환하는지 확인
                .andExpect(jsonPath("$.code").value("Not Ok")) // 18. 핸들러가 반환하는 code 확인
                .andExpect(jsonPath("$.message").value("이미 사용 중인 이메일입니다.")); // 19. 서비스가 던진 예외 메시지 확인
    }
}
