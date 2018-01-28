package com.authright.demo.security.auth.jwt;

import com.authright.demo.security.auth.JwtAuthenticationToken;
import com.authright.demo.security.exception.AuthMethodNotSupportedException;
import com.authright.demo.security.model.JwtSettings;
import com.authright.demo.security.model.UserContext;
import com.authright.demo.security.model.token.RawAccessJwtToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

//Customized JWT authentication method
@Component
@SuppressWarnings("unchecked")
public class JwtAuthenticationProvider implements AuthenticationProvider{
    private final JwtSettings settings;
    private static Logger logger = LoggerFactory.getLogger(JwtAuthenticationProvider.class);

    @Autowired
    public JwtAuthenticationProvider(JwtSettings settings){
        this.settings = settings;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        RawAccessJwtToken rawAccessToken = (RawAccessJwtToken) authentication.getCredentials();

        Jws<Claims> jwsClaims = rawAccessToken.parseClaims(settings.getTokenSigningKey());
        String subject = jwsClaims.getBody().getSubject();
        Boolean forRefresh = jwsClaims.getBody().get("refresh", Boolean.class);
        if (forRefresh)
            throw new AuthMethodNotSupportedException("Refresh token cannot be used as access token");
        List<String> scopes = jwsClaims.getBody().get("scopes", List.class);
        List<GrantedAuthority> authorities = scopes.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserContext context = UserContext.create(subject, authorities);

        return new JwtAuthenticationToken(context, context.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
