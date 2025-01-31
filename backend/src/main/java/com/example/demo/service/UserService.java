package com.example.demo.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public List<User> getUserApi() {

    	List<User> users = userRepository.findAll();
        logger.info("Users fetched from database: {}", users);
        return users;
    }
}