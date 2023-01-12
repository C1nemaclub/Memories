package com.cinema.jwt.user;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Optional;

@Service
public class UserService {

    private static final String UPLOAD_FOLDER = "src/web/avatar/";
    private static final String UPLOAD_DIR = "src/main/resources/static/avatar/";

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
                    user.get().getAvatar(),
                    user.get().getId(),
                    user.get().getPosts());
            return userResponse;
        } else {
            return new UserRequest(null,null ,null, null, null, null);
        }
    }

    public String updateAvatar(Integer id, MultipartFile file) throws IOException {

        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
        String saveRoute = UPLOAD_DIR + user.get().getId() + file.getOriginalFilename();

        FileOutputStream output = new FileOutputStream(saveRoute);
        output.write(file.getBytes());
        Path path = Path.of(saveRoute).toAbsolutePath();

        user.get().setAvatar(user.get().getId() + file.getOriginalFilename());
        userRepository.save(user.get());
            return "Avatar successfully saved";
        } else{
             return "Cant find user";
        }
    }
}
