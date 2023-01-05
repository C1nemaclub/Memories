package com.cinema.jwt.user;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }


    @GetMapping("/me/{id}")
    public ResponseEntity<UserRequest> getMe(@PathVariable Integer id) {
       UserRequest user = userService.findUserById(id);
        if(user.getEmail() != null){
            return ResponseEntity.ok().body(user);
        } else{
            return ResponseEntity.notFound().build();
        }
    }
}
