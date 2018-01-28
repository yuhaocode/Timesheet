package com.authright.demo.security.model.token;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.jsonwebtoken.Claims;

//parsed representation of JWT token with its claims for access
public class AccessJwtToken implements JwtToken {

    private final String rawToken;
    @JsonIgnore
    private Claims claims;

    public AccessJwtToken(final String token, Claims claims){
        this.rawToken = token;
        this.claims = claims;
    }

    @Override
    public String getToken() {
        return this.rawToken;
    }

    public Claims getClaims() {
        return claims;
    }
}
