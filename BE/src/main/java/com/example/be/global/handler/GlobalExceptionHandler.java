package com.example.be.global.handler;

import com.example.be.global.dto.ApiResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
//이 어노테이션 덕분에 전역에서 발생하는 예외상황 가져감
//즉 UserController에서 사용자가 입력한 회원가입 정보의 유효성을 검사하면서 예외가 발생하면 여기서처리해줌 해당 어노테이션때문에


public class GlobalExceptionHandler {
//UserController 에서 발생한 예외클래스명이 있을거잖아. 그 예외와 매핑해주기 위해서 @ExceptionHandler 어노테이션을 사용

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleIllegalArgumentException(IllegalArgumentException e) {
        ApiResponseDto<Void> response = ApiResponseDto.error("Not Ok", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleValidationExceptions(MethodArgumentNotValidException e) {
        String errorMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        ApiResponseDto<Void> response = ApiResponseDto.error("VALIDATION_FAILED", errorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}