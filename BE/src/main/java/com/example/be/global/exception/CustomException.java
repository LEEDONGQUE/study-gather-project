package com.example.be.global.exception;

public class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}