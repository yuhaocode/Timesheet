package com.authright.demo.security;

import com.authright.demo.utility.WebUtil;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

public class CustomCorsFilter extends CorsFilter {

    public CustomCorsFilter(){
        super(configurationSource());
    }

    private static UrlBasedCorsConfigurationSource configurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader(SecurityConfig.AUTHENTICATION_HEADER_NAME);
        config.addAllowedHeader(WebUtil.CONTENT_TYPE);
        config.setMaxAge(3600L);
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
