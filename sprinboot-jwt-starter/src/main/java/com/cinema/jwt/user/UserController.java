package com.cinema.jwt.user;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


    @PutMapping("/me/{id}")
    public ResponseEntity<String> setAvatar(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.updateAvatar(id, file));
    }
}
