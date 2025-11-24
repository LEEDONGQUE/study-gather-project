package com.example.be.study.repository;

import com.example.be.study.entity.Participant;
import com.example.be.study.entity.Study;
import com.example.be.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    // 같은 유저가 같은 스터디에 이미 신청했는지 체크
    boolean existsByStudyAndUser(Study study, UserEntity user);
}
