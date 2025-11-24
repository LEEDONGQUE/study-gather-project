package com.example.be.study.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.study.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/participants")
public class ParticipantController {

    private final ParticipantService participantService;

    /**
     * 스터디 신청
     * 요청 예시: POST /participants/1?userId=3
     */
    @PostMapping("/{studyId}")
    public ResponseEntity<ApiResponseDto<Void>> apply(
            @PathVariable("studyId") Long studyId,
            @RequestParam("userId") Long userId
    ) {

        participantService.apply(studyId, userId);

        return ResponseEntity.ok(
                ApiResponseDto.success("스터디 참여가 완료되었습니다.", null)
        );
    }
}
