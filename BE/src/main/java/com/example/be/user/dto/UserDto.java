package com.example.be.user.dto;

public class UserDto {
    private String student_number; //DB에서 user관련 테이블에서 PK역할
    private String user_name;// 사용자 이름
    private String email;// 사용자 이메일
    private String password; // 사용자 패스워드

    public UserDto(){}//기본 생성자

    public String getStudent_number(){
        return student_number;
    }

    public void setStudent_number(String student_number){
        this.student_number = student_number;
    }

    public String getUser_name(){
        return user_name;
    }

    public void setUser_name(String user_name){
        this.user_name = user_name;
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }

    public UserDto(String student_number, String user_name, String email, String password) {
        this.student_number = student_number;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
    } //생성자
}
