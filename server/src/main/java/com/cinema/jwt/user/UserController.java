package com.cinema.jwt.user;


import com.cinema.jwt.config.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final JwtService jwtService;

    private final UserRepository userRepository;
    private final UserService userService;
    public UserController(JwtService jwtService, UserRepository userRepository, UserService userService) {
        this.jwtService = jwtService;
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


    @GetMapping("/profile")
    public ResponseEntity<UserRequest> getMyself(@RequestHeader HttpHeaders headers) {
        System.out.println("Profile");
        String token =  headers.getFirst(HttpHeaders.AUTHORIZATION).substring(7);
        String email = jwtService.extractUsername(token);
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
        UserRequest userRequest = new UserRequest(
                user.get().getEmail(),
                user.get().getFirstname(),
                user.get().getLastname(),
                user.get().getAvatar(),
                user.get().getId(),
                user.get().getPosts());

        return ResponseEntity.ok().body(userRequest);
        } else {
            return ResponseEntity.notFound().build();
        }

    };


    @PutMapping("/me/{id}")
    public ResponseEntity<String> setAvatar(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.updateAvatar(id, file));
    }
}
