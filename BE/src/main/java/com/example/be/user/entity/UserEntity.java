package com.example.be.user.entity;

import com.example.be.user.dto.SignUpRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String studentNumber;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    public UserEntity() {}//기본 생성자

    @Builder
    public UserEntity(String studentNumber, String userName, String email, String password) {
        this.studentNumber = studentNumber;
        this.userName = userName;
        this.email = email;
        this.password =   password;

    }

}
