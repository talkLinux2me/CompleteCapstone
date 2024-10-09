package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.User;

public interface UserRepository extends JpaRepository <User, Long> {

    // Finds a user by email and password
    Optional<User> findByEmailAndPassword(String email, String password);

    // Custom query to find a user by email
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);

    //new code incoming...

    // Custom query to find users by their role
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findByRole(String role);

    // Custom query to find all users with a specific certification
    @Query("SELECT u FROM User u WHERE u.certifications LIKE %:certification%")
    List<User> findByCertification(String certification);

    // Custom query to find users with years of experience greater than a specified number
    @Query("SELECT u FROM User u WHERE u.yearsOfExperience > :years")
    List<User> findUsersWithMoreThanYearsOfExperience(int years);

}