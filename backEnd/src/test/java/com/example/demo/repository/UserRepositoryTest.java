package com.example.demo;

import com.example.demo.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setName("Test User");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password");
        userRepository.save(testUser);
    }

    @Test
    void testFindByEmail() {
        Optional<User> foundUser = userRepository.findByEmail("test@example.com");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getName()).isEqualTo("Test User");
    }

    @Test
    void testFindByEmailAndPassword_Success() {
        Optional<User> foundUser = userRepository.findByEmailAndPassword("test@example.com", "password");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testFindByEmailAndPassword_Failure() {
        Optional<User> foundUser = userRepository.findByEmailAndPassword("test@example.com", "wrongpassword");
        assertThat(foundUser).isNotPresent();
    }

    @Test
    void testFindById() {
        Optional<User> foundUser = userRepository.findById(testUser.getId());
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testDeleteById() {
        userRepository.deleteById(testUser.getId());
        Optional<User> foundUser = userRepository.findById(testUser.getId());
        assertThat(foundUser).isNotPresent();
    }
}

