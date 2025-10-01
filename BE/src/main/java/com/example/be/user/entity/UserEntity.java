package com.example.be.user.entity;

import com.example.be.user.dto.UserDto;
import jakarta.persistence.*;
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

    public UserEntity(UserDto userdto) {
        this.studentNumber = userdto.getStudentNumber();
        this.userName = userdto.getUserName();
        this.email = userdto.getEmail();
        this.password = userdto.getPassword();
    }

}
