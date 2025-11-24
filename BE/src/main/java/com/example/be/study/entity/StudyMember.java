package com.example.be.study.entity;

import com.example.be.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "study_member")
public class StudyMember {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;   // 신청한 사람

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;       // 신청한 스터디

    private LocalDate applicationDate; // 신청 날짜

    @Builder
    public StudyMember(UserEntity user, Study study, LocalDate applicationDate) {
        this.user = user;
        this.study = study;
        this.applicationDate = applicationDate;
    }
}