package com.example.be.study.repository;

import com.example.be.study.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface StudyRepository extends JpaRepository<Study, Long> {
    // 스터디 관련 조회 메서드를 추가하려면 여기 작성


}
