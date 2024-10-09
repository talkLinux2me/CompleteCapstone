package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Represents a request for user login.
 * This class encapsulates the necessary credentials for authentication.
 */

@Setter
@Getter
public class LoginRequest {
    private String email;
    private String password;

}