// src/main/java/com/example/demo/user/dto/UserResponseDto.java
package com.example.be.user.dto;

import com.example.be.user.entity.UserEntity;
import lombok.Getter;

@Getter
public class UserResponseDto {

    private final String studentNumber;
    private final String userName;
    private final String email;

    // UserEntity 객체를 받아 필요한 데이터만 추출하는 생성자
    public UserResponseDto(UserEntity userEntity) {
        this.studentNumber = userEntity.getStudentNumber();
        this.userName = userEntity.getUserName();
        this.email = userEntity.getEmail();
    }
}