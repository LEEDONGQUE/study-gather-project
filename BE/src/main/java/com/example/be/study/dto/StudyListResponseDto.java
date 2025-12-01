package com.example.be.study.dto;

import com.example.be.study.entity.Study;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class StudyListResponseDto {
    private Long studyId;
    private String studyTitle;
    private String studyTopic;

    private LocalDate startDate;
    private LocalDate endDate;

    private Integer maxParticipants;
    private Integer currentParticipants;

    public static StudyListResponseDto from(Study study) {
        return StudyListResponseDto.builder()
                .studyId(study.getStudyId()) // 수정됨: getId() -> getStudyId()
                .studyTitle(study.getStudyTitle())
                .studyTopic(study.getStudyTopic())
                .startDate(study.getStartDate())
                .endDate(study.getEndDate())
                .maxParticipants(study.getMaxParticipants())
                // TODO currentParticipants 로직 작성 (현재는 값을 넣지 않아 null 또는 0이 될 수 있음)
                .build();
    }
}