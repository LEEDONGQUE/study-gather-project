package com.example.be.user.controller;

import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest // 실제 Spring 컨테이너를 실행하여 테스트
@AutoConfigureMockMvc // MockMvc(가짜 HTTP 요청 객체)를 자동으로 설정
@Transactional // 각 테스트가 끝난 후 DB를 롤백하여 테스트 간 독립성 보장
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc; // API를 테스트하기 위한 객체

    @Autowired
    private ObjectMapper objectMapper; // 객체를 JSON 문자열로 변환하기 위한 객체

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        // 각 테스트 실행 전에 DB를 깨끗하게 비웁니다.
        userRepository.deleteAllInBatch();
    }

    @Test
    @DisplayName("회원가입 API 성공 테스트")
    void signUpApi_success() throws Exception {
        // given
        SignUpRequestDto requestDto = createSignUpRequestDto("testuser", "password123!");

        // when
        // /users/signup 경로로 POST 요청을 보냄
        ResultActions resultActions = mockMvc.perform(post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON) // 요청 본문의 타입
                .content(objectMapper.writeValueAsString(requestDto))); // 객체를 JSON으로 변환

        // then
        // 응답 상태가 201 Created인지 확인
        resultActions.andExpect(status().isCreated())
                // 응답 본문의 code 필드가 "OK"인지 확인 (JSON Path 사용)
                .andExpect(jsonPath("$.code").value("OK"))
                .andExpect(jsonPath("$.message").value("회원 가입이 완료되었습니다."))
                .andDo(print()); // 요청/응답 전체 내용 출력
    }

    @Test
    @DisplayName("회원가입 API 실패 - 잘못된 이메일 형식")
    void signUpApi_fail_invalidEmail() throws Exception {
        // given
        SignUpRequestDto requestDto = createSignUpRequestDto("testuser", "password123!");
        requestDto.setEmail("invalid-email"); // 유효하지 않은 이메일 설정

        // when
        ResultActions resultActions = mockMvc.perform(post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDto)));

        // then
        // 응답 상태가 400 Bad Request인지 확인
        resultActions.andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
                .andExpect(jsonPath("$.message").value("이메일 형식이 올바르지 않습니다."))
                .andDo(print());
    }

    // 헬퍼 메서드
    private SignUpRequestDto createSignUpRequestDto(String username, String password) {
        SignUpRequestDto requestDto = new SignUpRequestDto();
        requestDto.setStudentNumber("20250001");
        requestDto.setUserName(username);
        requestDto.setEmail("test@example.com");
        requestDto.setPassword(password);
        requestDto.setPasswordCheck(password);
        return requestDto;
    }
}
