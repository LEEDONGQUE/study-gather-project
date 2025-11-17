package com.example.be.study.dto; // 1. 패키지 이름이 dto인지 확인!

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudyCreateRequestDto { // 2. 클래스 이름이 DTO인지 확인!

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
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "날짜 형식은 YYYY-MM-DD 여야 합니다.") // 3. 날짜 검증
    private String startDate;

    @JsonProperty("end_date")
    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "날짜 형식은 YYYY-MM-DD 여야 합니다.") // 4. 날짜 검증
    private String endDate;

    @JsonProperty("chat_link")
    private String chatLink;
}