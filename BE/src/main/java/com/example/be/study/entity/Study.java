package com.example.be.study.entity;

import com.example.be.user.entity.UserEntity;
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
    private Long id;

    @Column(nullable = false)
    private String studyTitle; // 모임 이름

    @Column(nullable = false)
    private String studyTopic; // 주제

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer maxParticipants;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private LocalDate startDate; // 모집 기간 (시작)

    @Column(nullable = false)
    private LocalDate endDate;   // 모집 기간 (끝)

    private String chatLink;

    //  주최자 정보 (UserEntity와 연결)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id")
    private UserEntity organizer;
    //해당 organizer_id는  study 테이블을 참조하는 역할 (FK)

    @Builder
    public Study(String studyTitle, String studyTopic, String description,
                 Integer maxParticipants, String place, LocalDate startDate,
                 LocalDate endDate, String chatLink, UserEntity organizer) {
        this.studyTitle = studyTitle;
        this.studyTopic = studyTopic;
        this.description = description;
        this.maxParticipants = maxParticipants;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.chatLink = chatLink;
        this.organizer = organizer;
    }
}