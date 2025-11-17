package com.example.be.study.controller;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.dto.StudyCreateResponseDto;
import com.example.be.study.service.StudyService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studies")
public class StudyController {

    private final StudyService studyService;

    @PostMapping
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