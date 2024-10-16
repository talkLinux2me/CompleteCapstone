package com.example.demo.dto;

import lombok.Data;

import java.util.List;

/**
 * Data Transfer Object (DTO) for editing user information.
 * This class encapsulates the data required to update a user's profile.
 */

@Data
public class EditUserDTO {
    private String location;
    private String personalStatement;
    private String certifications;
    private int yearsOfExperience;
    private String meetingType;
}