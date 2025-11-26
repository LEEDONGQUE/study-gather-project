package com.example.be.study.repository;

import com.example.be.study.entity.Study;
import com.example.be.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // List를 사용하기 위해 필요합니다.

// @Repository // (선택사항) JpaRepository를 상속받으면 생략 가능하므로 굳이 안 써도 됩니다.

public interface StudyRepository extends JpaRepository<Study, Long> {
    
    // 내가 만든(주최한) 스터디 목록 조회
    List<Study> findAllByOrganizer(UserEntity organizer);

}