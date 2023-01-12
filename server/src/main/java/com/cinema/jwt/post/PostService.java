package com.cinema.jwt.post;

import com.cinema.jwt.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Optional;

@Service
public class PostService {
    private static final String UPLOAD_FOLDER = "src/web/images/";
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public ResponseEntity<Post> editPost(MultipartFile file, String request, Integer postId) throws IOException {
        FileOutputStream imageOutput  = new FileOutputStream(UPLOAD_FOLDER + file.getOriginalFilename());
        imageOutput.write(file.getBytes());
        Path path = Path.of(UPLOAD_FOLDER + file.getOriginalFilename()).toRealPath();

        ObjectMapper objectMapper = new ObjectMapper();
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            Post postRequest = objectMapper.readValue(request, Post.class);
            post.get().setTitle(postRequest.getTitle());
            post.get().setDescription(postRequest.getDescription());
            post.get().setImageRef(path.toString());
            postRepository.save(post.get());
            return ResponseEntity.ok().body(post.get());
        } else{
            return ResponseEntity.notFound().build();
        }
    }
}
