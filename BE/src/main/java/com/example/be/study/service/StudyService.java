package com.example.be.study.service;

import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.dto.StudyDetailResponseDto;
import com.example.be.study.dto.StudyListResponseDto;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

public interface StudyService {
    Page<StudyListResponseDto> getStudyList(Integer page, Integer size);
    StudyDetailResponseDto getStudyDetail(Long studyId);
    Long createStudy(@Valid StudyCreateRequestDto requestDto);
}
