package com.authright.demo.security.exception;

import com.authright.demo.security.model.token.JwtToken;
import org.springframework.security.core.AuthenticationException;

public class JwtExpiredTokenException extends AuthenticationException {
    private static final long serialVersionUID = 9139899570859599665L;

    private JwtToken token;

    public JwtExpiredTokenException(String msg){
        super(msg);
    }

    public JwtExpiredTokenException(JwtToken token, String msg, Throwable t){
        super(msg, t);
        this.token = token;
    }

    public String token(){
        return this.token.getToken();
    }
}
