package com.example.be.config;

import com.example.be.global.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // JWT 필터를 SecurityConfig에 주입받음
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // 비밀번호 암호화용 Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Spring Security 필터 체인 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // 1. CSRF 보호 비활성화 (JWT라서 필요 없음)
                .csrf(AbstractHttpConfigurer::disable)
                // 기본 로그인 비활성화
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)

                // 2. 세션을 STATELESS로 설정 (JWT 기반이므로 서버에 세션 저장 X)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 3. 요청별 인가 규칙 설정
                .authorizeHttpRequests(auth -> auth
                        // 회원가입, 로그인은 인증 없이 접근 허용
                        .requestMatchers(HttpMethod.POST, "/users/signup").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users/login").permitAll()
                        // 이 외 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )

                // 4. JWT 필터를 Spring Security 필터체인의 앞단에 추가
                //    UsernamePasswordAuthenticationFilter 실행 전에 JWT 검사 진행
                .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 최종적으로 SecurityFilterChain 객체 반환
        return http.build();
    }
}
