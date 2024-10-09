package com.example.demo;

import com.example.demo.dto.EditUserDTO;
import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.UserServicesImplements;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServicesImplementsTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServicesImplements userServices;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("password");
        mockUser.setRole("mentor");
    }

    @Test
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(mockUser));

        List<User> users = userServices.getAllUsers();
        assertEquals(1, users.size());
        assertEquals(mockUser.getId(), users.get(0).getId());
    }

    @Test
    void testGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        Optional<User> user = userServices.getUserById(1L);
        assertTrue(user.isPresent());
        assertEquals(mockUser.getEmail(), user.get().getEmail());
    }

    @Test
    void testDeleteUserById() {
        doNothing().when(userRepository).deleteById(1L);
        userServices.deleteUserById(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void testSaveUser() {
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Optional<User> savedUser = userServices.saveUser(mockUser);
        assertTrue(savedUser.isPresent());
        assertEquals(mockUser.getEmail(), savedUser.get().getEmail());
    }

    @Test
    void testFindByEmail() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

        Optional<User> user = userServices.findByEmail("test@example.com");
        assertTrue(user.isPresent());
        assertEquals(mockUser.getEmail(), user.get().getEmail());
    }

    @Test
    void testLoginUser_Success() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

        Optional<User> user = userServices.loginUser("test@example.com", "password");
        assertTrue(user.isPresent());
        assertEquals(mockUser.getEmail(), user.get().getEmail());
    }

    @Test
    void testLoginUser_Failure() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

        Optional<User> user = userServices.loginUser("test@example.com", "wrongpassword");
        assertFalse(user.isPresent());
    }

    @Test
    void testAddMentee() {
        User menteeUser = new User();
        menteeUser.setId(2L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(userRepository.findById(2L)).thenReturn(Optional.of(menteeUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Optional<User> result = userServices.addMentee(1L, 2L);
        assertTrue(result.isPresent());
        assertTrue(mockUser.getMentees().contains(2L));
    }

    @Test
    void testRemoveMentee() {
        User menteeUser = new User();
        menteeUser.setId(2L);
        mockUser.getMentees().add(2L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(userRepository.findById(2L)).thenReturn(Optional.of(menteeUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Optional<User> result = userServices.removeMentee(1L, 2L);
        assertTrue(result.isPresent());
        assertFalse(mockUser.getMentees().contains(2L));
    }

    @Test
    void testEditUserProfile() {
        EditUserDTO editUserDTO = new EditUserDTO();
        editUserDTO.setLocation("New Location");

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Optional<User> updatedUser = userServices.editUserProfile(1L, editUserDTO);
        assertTrue(updatedUser.isPresent());
        assertEquals("New Location", updatedUser.get().getLocation());
    }

    @Test
    void testCalculateMatchScore() {
        User mentor = new User();
        mentor.setMeetingType("virtual");
        mentor.setAvailability(Arrays.asList("full time", "part time"));
        mentor.setCodingLanguage(Arrays.asList("Java"));

        mockUser.setMeetingType("virtual");
        mockUser.setAvailability(Arrays.asList("full time"));
        mockUser.setCodingLanguage(Arrays.asList("Java", "Python"));

        int score = userServices.calculateMatchScore(mockUser, mentor);
        assertEquals(3, score); // Should match on meeting type, availability, and coding language
    }

}
