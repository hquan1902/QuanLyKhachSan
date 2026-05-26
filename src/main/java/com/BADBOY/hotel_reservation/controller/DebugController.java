package com.BADBOY.hotel_reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.BADBOY.hotel_reservation.dto.ApiResponse;
import com.BADBOY.hotel_reservation.entity.User;
import com.BADBOY.hotel_reservation.repository.Person.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/check-password/{account}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkPassword(
            @PathVariable String account,
            @RequestParam String rawPassword) {
        
        User user = userRepository.findByAccount(account).orElse(null);
        
        Map<String, Object> result = new HashMap<>();
        if (user == null) {
            result.put("found", false);
            return ResponseEntity.ok(ApiResponse.success("User not found", result));
        }
        
        result.put("found", true);
        result.put("account", user.getAccount());
        result.put("passwordFromDB", user.getPassword());
        result.put("passwordLength", user.getPassword().length());
        result.put("passwordPrefix", user.getPassword().substring(0, Math.min(10, user.getPassword().length())));
        result.put("rawPasswordProvided", rawPassword);
        result.put("matches", passwordEncoder.matches(rawPassword, user.getPassword()));
        
        return ResponseEntity.ok(ApiResponse.success("Password check result", result));
    }
}
