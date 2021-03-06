package com.authright.demo.utility;

import org.springframework.security.web.savedrequest.SavedRequest;

import javax.servlet.http.HttpServletRequest;

//Utilities for some web checking
public class WebUtil {
    private static final String XML_HTTP_REQUEST = "XMLHttpRequest";
    private static final String X_REQUESTED_WITH = "X-Requested-With";
    public static final String CONTENT_TYPE = "Content-Type";
    private static final String CONTENT_TYPE_JSON = "application/json";

    public static boolean isAjax(HttpServletRequest request){
        return XML_HTTP_REQUEST.equals(request.getHeader(XML_HTTP_REQUEST));
    }

    public static boolean isAjax(SavedRequest request){
        return request.getHeaderValues(XML_HTTP_REQUEST).contains(XML_HTTP_REQUEST);
    }

    public static boolean isContentTypeJson(SavedRequest request){
        return request.getHeaderValues(CONTENT_TYPE).contains(CONTENT_TYPE_JSON);
    }
}
