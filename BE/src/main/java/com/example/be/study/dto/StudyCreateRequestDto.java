package com.example.be.study.dto; // 1. 패키지 이름이 dto인지 확인!

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class StudyCreateRequestDto {

    @JsonProperty("study_title")
    @NotBlank
    private String studyTitle;

    @JsonProperty("study_topic")
    @NotBlank
    private String studyTopic;

    @JsonProperty("description")
    @NotBlank
    private String description;

    @JsonProperty("max_participants")
    @NotNull
    private Integer maxParticipants;

    @JsonProperty("place")
    @NotBlank
    private String place;

    @JsonProperty("start_date")
    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "날짜 형식은 YYYY-MM-DD 여야 합니다.")
    private String startDate;

    @JsonProperty("end_date")
    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "날짜 형식은 YYYY-MM-DD 여야 합니다.")
    private String endDate;

    @JsonProperty("chat_link")
    private String chatLink;
}
