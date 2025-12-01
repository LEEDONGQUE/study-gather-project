package com.example.be.study.dto;

import com.example.be.study.entity.Study;
import com.example.be.user.dto.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class StudyDetailResponseDto {
    private Long studyId;
    private String studyTitle;
    private String studyTopic;

    private LocalDate startDate;
    private LocalDate endDate;

    private String description;
    private String place;
    private String chatLink;

    private Integer maxParticipants;
    private Integer currentParticipants;

    UserResponseDto organizer;

    public static StudyDetailResponseDto from(Study study) {
        return StudyDetailResponseDto.builder()
                .studyId(study.getStudyId())
                .studyTitle(study.getStudyTitle())
                .studyTopic(study.getStudyTopic())
                .startDate(study.getStartDate())
                .endDate(study.getEndDate())
                .description(study.getDescription())
                .place(study.getPlace())
                .chatLink(study.getChatLink())
                .maxParticipants(study.getMaxParticipants())
                // TODO currentParticipants 로직 작성
                // TODO organizer from 추가
                .build();
    }
}
