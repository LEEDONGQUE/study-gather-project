package com.example.be.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginRequestDto {
    @NotBlank(message = "학번은 필수 입력 값입니다.")
    private String studentNumber;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    private String password;

}
