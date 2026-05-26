package com.BADBOY.hotel_reservation.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC Configuration
 * Cấu hình để serve static files (HTML, CSS, JS) từ thư mục frontend
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Use file:/// protocol with absolute path to frontend directory
        // This ensures Spring can find the frontend folder regardless of working directory
        String frontendPath = "file:///" + System.getProperty("user.dir").replace("\\", "/") + "/frontend/";
        
        // Serve frontend files from /frontend/** URL pattern
        registry.addResourceHandler("/frontend/**")
                .addResourceLocations(frontendPath)
                .setCachePeriod(0); // Disable cache for development
        
        // Also serve from classpath static folder (if you move files there later)
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(3600); // Cache for 1 hour
    }

    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        // Add default redirect for root -> frontend index so root URL serves the SPA
        // This ensures requests to "/" (and thus context root) return the frontend index.html
        registry.addRedirectViewController("/", "/frontend/index.html");
    }
}
