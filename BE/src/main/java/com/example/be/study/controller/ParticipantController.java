package com.example.be.study.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.study.service.ParticipantService;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/participants")
public class ParticipantController {

    private final ParticipantService participantService;
    private final UserRepository userRepository;

    @PostMapping("/{studyId}")
    public ResponseEntity<ApiResponseDto<Void>> apply(
            @PathVariable("studyId") Long studyId,
            Authentication authentication
    ) {
        // 1. JWTAuthenticationFilter 에서 넣어준 학번(studentNumber) 꺼내기
        String studentNumber = (String) authentication.getPrincipal();

        // 2. DB에서 userId 조회
        UserEntity user = userRepository.findByStudentNumber(studentNumber)
                .orElseThrow(() ->
                        new IllegalArgumentException("유저 정보를 찾을 수 없습니다. studentNumber=" + studentNumber));

        Long userId = user.getUserId();

        // 3. 서비스 호출
        participantService.apply(studyId, userId);

        return ResponseEntity.ok(
                ApiResponseDto.success("스터디 참여 신청이 완료되었습니다.", null)
        );
    }
}

