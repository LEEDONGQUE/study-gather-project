package com.example.be.study.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StudyCreateResponseDto {

    @JsonProperty("study_id")
    private Long studyId;
}
