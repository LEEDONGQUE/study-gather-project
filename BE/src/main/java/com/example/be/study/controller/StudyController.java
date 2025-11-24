package com.example.be.study.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.dto.StudyCreateResponseDto;
import com.example.be.study.dto.StudyDetailResponseDto;
import com.example.be.study.dto.StudyListResponseDto;
import com.example.be.study.service.StudyService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studies")
public class StudyController {

    private final StudyService studyService;

    /**
     * 스터디 목록을 조회한다.
     * @param page 현재 페이지 (기본값: 1)
     *             -> 사용자 입장에선 1부터 시작함이 자연스러우나, JPA 내부적으로는 0부터 시작하여야 함
     *             -> page - 1로 구현
     * @param size 페이지당 표시 수 (기본값: 10)
     */
    @GetMapping()
    public ResponseEntity<ApiResponseDto<Page<StudyListResponseDto>>> getStudyList(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {

        Page<StudyListResponseDto> result = studyService.getStudyList(page - 1, size);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponseDto<>("OK", "스터디 목록 조회 성공", result));
    }


    /**
     * 스터디 상세 내용을 조회한다.
     * @param studyId 스터디 고유번호
     */
    @GetMapping("/{studyId}")
    public ResponseEntity<ApiResponseDto<StudyDetailResponseDto>> getStudyDetail(@PathVariable Long studyId) {

        StudyDetailResponseDto result = studyService.getStudyDetail(studyId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponseDto<>("OK", "스터디 상세 조회 성공", result));
    }


    @PostMapping("/create")
    public ResponseEntity<ApiResponseDto<StudyCreateResponseDto>> createStudy(
            @Valid @RequestBody StudyCreateRequestDto requestDto
    ) {

        Long studyId = studyService.createStudy(requestDto);

        StudyCreateResponseDto data = new StudyCreateResponseDto(studyId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponseDto<>("CREATED",
                        "스터디가 생성되었습니다.",
                        data));
    }

}