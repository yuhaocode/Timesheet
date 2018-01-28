package com.authright.demo.security.exception;

public class InvalidJwtTokenException extends RuntimeException {
    private static final long serialVersionUID = 3440554874337716353L;
    public InvalidJwtTokenException(String msg){
        super(msg);
    }
}
