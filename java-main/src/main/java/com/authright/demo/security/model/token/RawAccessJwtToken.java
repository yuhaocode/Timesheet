package com.authright.demo.security.model.token;

import com.authright.demo.security.exception.JwtExpiredTokenException;
import io.jsonwebtoken.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;

//Raw representation of JWT token
public class RawAccessJwtToken implements JwtToken {
    private static Logger logger = LoggerFactory.getLogger(RawAccessJwtToken.class);

    private String token;

    public RawAccessJwtToken(String token){
        this.token = token;
    }

    public Jws<Claims> parseClaims(String signingKey){
        try {
            return Jwts.parser().setSigningKey(signingKey).parseClaimsJws(this.token);
        } catch (UnsupportedJwtException | MalformedJwtException | IllegalArgumentException | SignatureException ex) {
            logger.error("Invalid JWT token", ex);
            throw new BadCredentialsException("Invalid JWT token", ex);
        } catch (ExpiredJwtException expiredEx) {
            logger.info("JWT token is expired", expiredEx);
            throw new JwtExpiredTokenException(this, "JWT token expired", expiredEx);
        }
    }

    @Override
    public String getToken() {
        return token;
    }
}
