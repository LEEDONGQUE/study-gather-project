package com.example.be.study.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.dto.StudyCreateResponseDto;
import com.example.be.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studies")
public class StudyController {

    private final StudyService studyService;

    /**
     * 스터디 생성 API
     * POST /studies
     */
    @PostMapping
    public ResponseEntity<ApiResponseDto<StudyCreateResponseDto>> createStudy(
            @RequestBody StudyCreateRequestDto requestDto
    ) {
        Long studyId = studyService.createStudy(requestDto);

        StudyCreateResponseDto responseDto =
                new StudyCreateResponseDto(studyId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("스터디 생성 완료", responseDto));
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<ApiResponseDto<String>> getStudy(
            @PathVariable Long studyId
    ) {
        return ResponseEntity.ok(
                ApiResponseDto.success("스터디 조회 기능은 아직 구현되지 않았습니다.", null)
        );
    }
}
