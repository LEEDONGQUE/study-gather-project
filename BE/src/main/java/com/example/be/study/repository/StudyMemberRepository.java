package com.example.be.study.repository;

import com.example.be.study.entity.StudyMember;
import com.example.be.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Long> {
    // 내가 신청한 스터디 목록 조회 (Study 정보를 한 번에 가져오기 위해 JOIN FETCH 사용)
    @Query("SELECT sm FROM StudyMember sm JOIN FETCH sm.study WHERE sm.user = :user")
    List<StudyMember> findAllByUser(@Param("user") UserEntity user);
}