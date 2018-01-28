package com.authright.demo.security;

import com.authright.demo.entity.User;
import com.authright.demo.security.auth.jwt.extractor.TokenExtractor;
import com.authright.demo.security.auth.jwt.verifier.TokenVerifier;
import com.authright.demo.security.exception.InvalidJwtTokenException;
import com.authright.demo.security.model.JwtSettings;
import com.authright.demo.security.model.UserContext;
import com.authright.demo.security.model.token.JwtToken;
import com.authright.demo.security.model.token.JwtTokenFactory;
import com.authright.demo.security.model.token.RawAccessJwtToken;
import com.authright.demo.security.model.token.RefreshToken;
import com.authright.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//Refresh token request handler
@RestController
public class RefreshTokenEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenEndpoint.class);

    @Autowired
    private JwtTokenFactory tokenFactory;

    @Autowired
    private JwtSettings settings;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenVerifier tokenVerifier;

    @Autowired
    @Qualifier("jwtHeaderTokenExtractor")
    private TokenExtractor tokenExtractor;

    @RequestMapping(value = SecurityConfig.REFRESH_TOKEN_URL, method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public @ResponseBody
    Map<String, String> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String token = tokenExtractor.extract(request.getHeader(SecurityConfig.AUTHENTICATION_HEADER_NAME));

        RawAccessJwtToken rawToken = new RawAccessJwtToken(token);
        RefreshToken refreshToken = RefreshToken.create(rawToken, settings.getTokenSigningKey()).orElseThrow(() -> new InvalidJwtTokenException("No valid roles for refreshing!"));

        Boolean forRefresh = refreshToken.getClaims().getBody().get("refresh", Boolean.class);
        if(forRefresh == null || !forRefresh)
            throw new InvalidJwtTokenException("This token is not used for refreshing");

        String jti = refreshToken.getJti();
        if(!tokenVerifier.verify(jti)){
            throw new InvalidJwtTokenException("Refresh token is no longer valid");
        }

        String subject = refreshToken.getSubject();
        User user = userService.getUserByUsername(subject);
        if(user == null)
            throw new UsernameNotFoundException("User not found: " + subject);

        if(user.getUserRoles() == null)
            throw new InsufficientAuthenticationException("User has no roles assigned.");

        List<GrantedAuthority> authorities = user.getUserRoles().stream()
                .map(userRole -> new SimpleGrantedAuthority(userRole.getRole().getName()))
                .collect(Collectors.toList());

        UserContext userContext = UserContext.create(user.getUsername(), authorities);

        JwtToken accessToken = tokenFactory.createAccessJwtToken(userContext);
        JwtToken newRefreshToken = tokenFactory.createRefreshToken(userContext);

        Map<String, String> tokenMap = new HashMap<String, String>();
        tokenMap.put("token", accessToken.getToken());
        tokenMap.put("refreshToken", newRefreshToken.getToken());
        logger.info("The access token of User " + user.getUsername() + " refreshed successfully");
        return tokenMap;
    }

}
