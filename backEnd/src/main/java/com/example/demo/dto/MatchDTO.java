package com.example.demo.dto;

import lombok.Data;

import java.util.List;

/**
 * Data Transfer Object (DTO) representing a match between a mentor and a mentee.
 * This class encapsulates the details relevant to the mentorship pairing.
 */

@Data
public class MatchDTO {
    private Long mentorId;
    private Long menteeId;
    private String mentorName;
    private String menteeName;
    private List<String> commonAvailability;
    private String meetingType;
    private List<String> commonCodingLanguage;
    private String interests;
    private String location;
    private String certifications;
}

//future implementations code