package com.example.be.study.service;

import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.entity.Study;
import com.example.be.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;

    @Override
    public Long createStudy(StudyCreateRequestDto requestDto) {

        Study study = Study.builder()
                .studyTitle(requestDto.getStudyTitle())
                .studyTopic(requestDto.getStudyTopic())
                .description(requestDto.getDescription())
                .maxParticipants(requestDto.getMaxParticipants())
                .place(requestDto.getPlace())
                .startDate(LocalDate.parse(requestDto.getStartDate()))
                .endDate(LocalDate.parse(requestDto.getEndDate()))
                .chatLink(requestDto.getChatLink())
                .build();

        studyRepository.save(study);

        return study.getStudyId();
    }
}