package com.BADBOY.hotel_reservation.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Frontend Controller - Serves static frontend files
 * This controller serves HTML, CSS, JS files from the frontend directory
 */
@Controller
public class FrontendController {

    // Use absolute path based on project structure
    // In production, you should use a configuration property
    private static final String FRONTEND_DIR;
    
    static {
        String userDir = System.getProperty("user.dir");
        // Handle case where working directory might be different
        if (userDir.endsWith("hotel-reservation-final")) {
            FRONTEND_DIR = userDir + File.separator + "frontend";
        } else {
            // Fallback: construct from known project structure
            FRONTEND_DIR = "E:\\hotel-reservation-perfectfinal-lastest\\hotel-reservation-perfectfinal\\hotel-reservation-perfectfinal\\hotel-reservation-final\\hotel-reservation-final\\frontend";
        }
        System.out.println("Frontend directory: " + FRONTEND_DIR);
    }

    /**
     * Serve root path - redirect to index.html
     */
    @GetMapping("/")
    public String index() {
        return "redirect:/index.html";
    }

    /**
     * Serve index.html at root level
     */
    @GetMapping("/index.html")
    public ResponseEntity<Resource> getIndexHtml() {
        return serveFrontendFile("index.html");
    }

    /**
     * Serve any HTML page at root level (e.g., guests.html, rooms.html, etc.)
     */
    @GetMapping("/{page}.html")
    public ResponseEntity<Resource> getHtmlPage(@PathVariable String page) {
        return serveFrontendFile(page + ".html");
    }

    /**
     * Serve any frontend file (HTML, CSS, JS, images, etc.)
     */
    @GetMapping("/frontend/{filename:.+}")
    public ResponseEntity<Resource> getFrontendFile(@PathVariable String filename) {
        return serveFrontendFile(filename);
    }

    /**
     * Serve files from assets/css/** 
     */
    @GetMapping("/assets/css/{filename:.+}")
    public ResponseEntity<Resource> getCssFile(@PathVariable String filename) {
        String filePath = "assets" + File.separator + "css" + File.separator + filename;
        return serveFrontendFile(filePath);
    }

    /**
     * Serve files from assets/js/**
     */
    @GetMapping("/assets/js/{filename:.+}")
    public ResponseEntity<Resource> getJsFile(@PathVariable String filename) {
        String filePath = "assets" + File.separator + "js" + File.separator + filename;
        return serveFrontendFile(filePath);
    }

    /**
     * Serve files from assets/images/**
     */
    @GetMapping("/assets/images/{filename:.+}")
    public ResponseEntity<Resource> getImageFile(@PathVariable String filename) {
        String filePath = "assets" + File.separator + "images" + File.separator + filename;
        return serveFrontendFile(filePath);
    }

    /**
     * Serve any file from assets/** (catch-all for other asset types)
     */
    @GetMapping("/assets/{subfolder}/{filename:.+}")
    public ResponseEntity<Resource> getAssetFile(
            @PathVariable String subfolder,
            @PathVariable String filename) {
        String filePath = "assets" + File.separator + subfolder + File.separator + filename;
        return serveFrontendFile(filePath);
    }

    /**
     * Generic method to serve any file from frontend directory
     */
    private ResponseEntity<Resource> serveFrontendFile(String filename) {
        try {
            Path filePath = Paths.get(FRONTEND_DIR, filename);
            File file = filePath.toFile();

            if (!file.exists() || !file.canRead()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);
            
            // Determine content type based on file extension
            String contentType = determineContentType(filename);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "no-cache")
                    .body(resource);
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Determine MIME type based on file extension
     */
    private String determineContentType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        
        return switch (extension) {
            case "html" -> "text/html";
            case "css" -> "text/css";
            case "js" -> "application/javascript";
            case "json" -> "application/json";
            case "png" -> "image/png";
            case "jpg", "jpeg" -> "image/jpeg";
            case "gif" -> "image/gif";
            case "svg" -> "image/svg+xml";
            case "ico" -> "image/x-icon";
            case "woff" -> "font/woff";
            case "woff2" -> "font/woff2";
            case "ttf" -> "font/ttf";
            default -> "application/octet-stream";
        };
    }
}
