package com.example.be.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository {

    boolean existsByStudentNumber(String studentNumber);
    //학번으로 DB에 이미 존재하는 회원인지 체크

    boolean existsByEmail(String email);
    //이메일로 이미 존재하는 회원인지 체크

}
