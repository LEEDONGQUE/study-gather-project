package com.example.be.study.service;

import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.dto.StudyDetailResponseDto;
import com.example.be.study.dto.StudyListResponseDto;
import com.example.be.study.entity.Study;
import com.example.be.study.repository.StudyRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;

    @Override
    public Page<StudyListResponseDto> getStudyList(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "startDate"));

        Page<Study> studyList = studyRepository.findAll(pageable);

        return studyList.map(StudyListResponseDto::from);
    }

    @Override
    public StudyDetailResponseDto getStudyDetail(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("스터디를 찾을 수 없습니다. id=" + studyId));

        return StudyDetailResponseDto.from(study);
    }

    @Override
    public Long createStudy(@Valid StudyCreateRequestDto requestDto) {

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