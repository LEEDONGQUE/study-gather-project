package com.example.be.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String studentNumber;   // 사용자 학번
    private String userName;        // 사용자 이름
    private String email;           // 사용자 이메일
    private String password;        // 사용자 패스워드

}