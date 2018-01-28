package com.authright.demo.security.auth.jwt.verifier;

import org.springframework.stereotype.Component;

//Verify the token is revoked or not. Not implemented yet
@Component
public class BloomFilterTokenVerifier implements TokenVerifier{
    @Override
    public boolean verify(String jti) {
        return true;
    }
}
