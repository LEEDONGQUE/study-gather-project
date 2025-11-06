package com.example.be.global.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // 시크릿 키 TODO 환경 변수 또는 프로퍼티로 변경
    private final Key key = Keys.hmacShaKeyFor("ASecretKeyForJwtTokenExample123!".getBytes());

    // 토큰 유효 시간: 1시간 TODO 환경 변수 또는 프로퍼티로 변경
    private static final long EXPIRATION_TIME = 1000L * 60 * 60;

    /**
     * 토큰 발행
     * @param studentNumber 학번
     * @return JWT Token
     */
    public String createToken(String studentNumber) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(studentNumber)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰 유효성 검증
     * @param token 토큰
     * @return 유효 여부
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * 토큰에서 사용자 정보 추출
     * @param token 토큰
     * @return 사용자 정보
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
