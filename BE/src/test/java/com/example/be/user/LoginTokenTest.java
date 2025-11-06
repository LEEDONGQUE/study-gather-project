package com.example.be.user;

import com.example.be.global.jwt.JwtTokenProvider;
import com.example.be.user.dto.LoginRequestDto;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class LoginTokenTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        UserEntity user = UserEntity.builder()
                .studentNumber("202012345")
                .userName("testName")
                .email("test@hufs.ac.kr")
                .password(passwordEncoder.encode("test1234"))
                .build();

        userRepository.save(user);
    }

    @Test
    @DisplayName("로그인 성공 시 JWT 토큰이 발급되었는지, 또한 그 Payload 값이 정확한지 테스트")
    void testJwtTokenIssuedAndPayloadValid() throws Exception {
        
        // Given
        LoginRequestDto dto = new LoginRequestDto();
        dto.setStudentNumber("202012345");
        dto.setPassword("test1234");

        String requestBody = """
            {
              "studentNumber": "202012345",
              "password": "test1234"
            }
            """;

        // When
        String response = mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("OK"))
                .andExpect(jsonPath("$.message").value("로그인 성공"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Then
        // JSON에서 토큰 추출
        String token = response.split("\"data\":\"")[1].split("\"")[0];
        assertThat(token).isNotBlank();

        // 토큰 파싱
        var claims = jwtTokenProvider.getClaims(token);

        // Assert
        assertThat(claims.getSubject()).isEqualTo("202012345");
    }
}
