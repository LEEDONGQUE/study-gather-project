package com.example.be.study.service;

import com.example.be.study.dto.StudyCreateRequestDto;
import jakarta.validation.Valid;

public interface StudyService {
    Long createStudy(@Valid StudyCreateRequestDto requestDto);
}
