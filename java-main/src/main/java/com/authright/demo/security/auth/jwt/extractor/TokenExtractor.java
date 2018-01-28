package com.authright.demo.security.auth.jwt.extractor;

public interface TokenExtractor {
    public String extract(String payload);
}
