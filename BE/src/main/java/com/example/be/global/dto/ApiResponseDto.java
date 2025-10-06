
package com.example.be.global.dto;

import lombok.Getter;

@Getter
public class ApiResponseDto<T> {

    private final String code;
    private final String message;
    private final T data;//나중에 각 API 기능 별 reposne문에 담길 객체 혹은 데이터가 다를 수 있기에 제네릭 타입으로 구현했음.



    private ApiResponseDto(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponseDto<T> success(String message, T data) {
        return new ApiResponseDto<>("OK", message, data);
    }

    // 실패,에러 응답을 생성하는 정적 팩토리 메서드
    public static <T> ApiResponseDto<T> error(String code, String message) {
        return new ApiResponseDto<>(code, message, null);
    }
}