package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name= "certifications")
    private String certifications;

    @Column(name = "profile_pic")
    private String profilePic;


    @ElementCollection
    @Column(name = "expertise")
    private List<String> expertise; // List of areas of expertise

    @Column(name = "years_of_experience")
    private int yearsOfExperience;

    @Column(name = "location")
    private String location;

    @Column(name ="role")
    private String role;

    @ElementCollection
    @Column(name = "coding_language")
    private List<String> codingLanguage;

    @ElementCollection
    @Column(name = "availability")
    private List<String> availability; // part time, full time, on demand


    @Column(name = "meeting_type")
    private String meetingType; // "virtual" or "in-person"

   @ElementCollection
   @CollectionTable(name = "mentee_ids", joinColumns = @JoinColumn(name = "user_id"))
   @Column(name = "mentee_id")
   private List<Long> mentees;

   @ElementCollection
   @CollectionTable(name = "mentor_ids", joinColumns = @JoinColumn(name = "user_id"))
   @Column(name = "mentor_id")
   private List<Long> mentors;


   private String personalStatement;


   private List<String> interests;

   private List <String> skills;


}
