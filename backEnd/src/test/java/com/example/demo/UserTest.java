package com.example.demo;

import com.example.demo.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
    }

    @Test
    void testSetAndGetId() {
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void testSetAndGetName() {
        user.setName("John Doe");
        assertEquals("John Doe", user.getName());
    }

    @Test
    void testSetAndGetPassword() {
        user.setPassword("securePassword");
        assertEquals("securePassword", user.getPassword());
    }

    @Test
    void testSetAndGetEmail() {
        user.setEmail("john.doe@example.com");
        assertEquals("john.doe@example.com", user.getEmail());
    }

    @Test
    void testSetAndGetExpertise() {
        user.setExpertise(Arrays.asList("Java", "Spring"));
        assertEquals(Arrays.asList("Java", "Spring"), user.getExpertise());
    }

    @Test
    void testSetAndGetYearsOfExperience() {
        user.setYearsOfExperience(5);
        assertEquals(5, user.getYearsOfExperience());
    }

    @Test
    void testSetAndGetLocation() {
        user.setLocation("New York");
        assertEquals("New York", user.getLocation());
    }

    @Test
    void testSetAndGetRole() {
        user.setRole("Mentor");
        assertEquals("Mentor", user.getRole());
    }

    @Test
    void testSetAndGetCodingLanguage() {
        user.setCodingLanguage(Arrays.asList("Java", "Python"));
        assertEquals(Arrays.asList("Java", "Python"), user.getCodingLanguage());
    }

    @Test
    void testSetAndGetAvailability() {
        user.setAvailability(Arrays.asList("Full-time", "Part-time"));
        assertEquals(Arrays.asList("Full-time", "Part-time"), user.getAvailability());
    }

    @Test
    void testSetAndGetMeetingType() {
        user.setMeetingType("virtual");
        assertEquals("virtual", user.getMeetingType());
    }

    @Test
    void testSetAndGetMentees() {
        user.setMentees(Arrays.asList(1L, 2L));
        assertEquals(Arrays.asList(1L, 2L), user.getMentees());
    }

    @Test
    void testSetAndGetMentors() {
        user.setMentors(Arrays.asList(3L, 4L));
        assertEquals(Arrays.asList(3L, 4L), user.getMentors());
    }

    @Test
    void testSetAndGetPersonalStatement() {
        user.setPersonalStatement("Aspiring developer.");
        assertEquals("Aspiring developer.", user.getPersonalStatement());
    }

    @Test
    void testSetAndGetInterests() {
        user.setInterests(Arrays.asList("AI", "Web Development"));
        assertEquals(Arrays.asList("AI", "Web Development"), user.getInterests());
    }

    @Test
    void testSetAndGetSkills() {
        user.setSkills(Arrays.asList("Problem Solving", "Communication"));
        assertEquals(Arrays.asList("Problem Solving", "Communication"), user.getSkills());
    }
}

