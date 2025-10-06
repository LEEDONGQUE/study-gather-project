package com.example.be.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class SignUpRequestDto {

    @NotBlank(message = "학번은 필수 입력 값입니다.")
    private String studentNumber;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String userName;

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$",
            message = "비밀번호는 영문과 숫자를 모두 포함하여 8자 이상 20자 이하이어야 합니다.")
    private String password;
    //^ 문자열 시작을 의미 , &문자열의 끝을 의미.

    @NotBlank(message = "비밀번호 확인은 필수입니다.")
    private String passwordCheck;
}