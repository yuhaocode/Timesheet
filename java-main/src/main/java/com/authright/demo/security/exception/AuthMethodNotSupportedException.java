package com.authright.demo.security.exception;

import org.springframework.security.core.AuthenticationException;

public class AuthMethodNotSupportedException extends AuthenticationException{
    private static final long serialVersionUID = -2502870645640126989L;

    public AuthMethodNotSupportedException(String msg) {
        super(msg);
    }
}
