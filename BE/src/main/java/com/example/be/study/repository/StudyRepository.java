package com.example.be.study.repository;

import com.example.be.study.entity.Study;
import com.example.be.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {
    // 내가 만든(주최한) 스터디 목록 조회
    List<Study> findAllByOrganizer(UserEntity organizer);
}