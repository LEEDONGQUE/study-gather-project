package com.example.be.user.repository;

import com.example.be.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
// JpaRepository<[엔티티 클래스], [PK 타입]> 형식으로 제네릭을 명시해야 합니다.
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // 학번으로 DB에 이미 존재하는 회원인지 체크
    boolean existsByStudentNumber(String studentNumber);

    // 이메일로 이미 존재하는 회원인지 체크
    boolean existsByEmail(String email);

    // 이메일로 사용자를 찾는 메서드 (로그인 시 필요)
    Optional<UserEntity> findByEmail(String email);
}