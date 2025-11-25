package com.example.be.study.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "study")
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_id")
    private Long studyId;

    @Column(nullable = false)
    private String studyTitle;

    @Column(nullable = false)
    private String studyTopic;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer maxParticipants;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    private String chatLink;

    @Builder
    public Study(String studyTitle, String studyTopic, String description,
                 Integer maxParticipants, String place, LocalDate startDate,
                 LocalDate endDate, String chatLink) {
        this.studyTitle = studyTitle;
        this.studyTopic = studyTopic;
        this.description = description;
        this.maxParticipants = maxParticipants;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.chatLink = chatLink;
    }
}
