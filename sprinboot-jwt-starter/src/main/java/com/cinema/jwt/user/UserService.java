package com.cinema.jwt.user;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRequest findUserById(Integer id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            UserRequest userResponse = new UserRequest(
                    user.get().getEmail(),
                    user.get().getFirstname(),
                    user.get().getLastname(),
                    user.get().getPosts());
            return userResponse;
        } else {
            return new UserRequest(null, null, null, null);
        }
    }
}
