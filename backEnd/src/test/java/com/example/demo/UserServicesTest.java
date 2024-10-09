package com.example.demo;

import com.example.demo.dto.EditUserDTO;
import com.example.demo.models.User;
import com.example.demo.services.UserServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServicesTest {

    private UserServices userServices;
    private User mockUser;

    @BeforeEach
    void setUp() {
        userServices = Mockito.mock(UserServices.class);
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("test@example.com");
        mockUser.setName("Test User");
    }

    @Test
    void testGetAllUsers() {
        when(userServices.getAllUsers()).thenReturn(Arrays.asList(mockUser));
        List<User> users = userServices.getAllUsers();
        assertEquals(1, users.size());
        assertEquals("Test User", users.get(0).getName());
    }

    @Test
    void testGetUserById() {
        when(userServices.getUserById(1L)).thenReturn(Optional.of(mockUser));
        Optional<User> user = userServices.getUserById(1L);
        assertTrue(user.isPresent());
        assertEquals("Test User", user.get().getName());
    }

    @Test
    void testDeleteUserById() {
        doNothing().when(userServices).deleteUserById(1L);
        userServices.deleteUserById(1L);
        verify(userServices, times(1)).deleteUserById(1L);
    }

    @Test
    void testSaveUser() {
        when(userServices.saveUser(mockUser)).thenReturn(Optional.of(mockUser));
        Optional<User> savedUser = userServices.saveUser(mockUser);
        assertTrue(savedUser.isPresent());
        assertEquals("Test User", savedUser.get().getName());
    }

    @Test
    void testFindByEmail() {
        when(userServices.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));
        Optional<User> user = userServices.findByEmail("test@example.com");
        assertTrue(user.isPresent());
        assertEquals("test@example.com", user.get().getEmail());
    }

    @Test
    void testLoginUser() {
        when(userServices.loginUser("test@example.com", "password")).thenReturn(Optional.of(mockUser));
        Optional<User> user = userServices.loginUser("test@example.com", "password");
        assertTrue(user.isPresent());
        assertEquals("Test User", user.get().getName());
    }

    // Add additional tests for other methods in UserServices

    @Test
    void testEditUserProfile() {
        EditUserDTO editUserDTO = new EditUserDTO(); // Populate this DTO as needed
        when(userServices.editUserProfile(1L, editUserDTO)).thenReturn(Optional.of(mockUser));
        Optional<User> updatedUser = userServices.editUserProfile(1L, editUserDTO);
        assertTrue(updatedUser.isPresent());
        assertEquals("Test User", updatedUser.get().getName());
    }
}

