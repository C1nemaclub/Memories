package com.cinema.jwt.post;

import com.cinema.jwt.user.User;
import com.cinema.jwt.user.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private static final String UPLOAD_FOLDER = "src/web/images/";
    private final UserRepository userRepository;


    private final PostRepository postRepository;

    public PostController(PostRepository postRepository,
                          UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }


    @PostMapping("/new")
    public ResponseEntity<Post> newPost(@RequestBody postRequest request) {
        Optional<User> user = userRepository.findById(request.author_id);
        Post post = new Post(null, user.get(),request.title,request.description,request.author,request.imageRef);
        postRepository.save(post);
        if(post != null){
        return new ResponseEntity<>(post, HttpStatus.CREATED);
        } else{
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestParam("file")MultipartFile file, @RequestParam("body") String request, @RequestParam("authorid") Integer authorid) throws JsonProcessingException, FileNotFoundException {
        try{

            FileOutputStream imageOutput = new FileOutputStream(UPLOAD_FOLDER  + file.getOriginalFilename());
            imageOutput.write(file.getBytes()); //Write
            Path path = Path.of(UPLOAD_FOLDER +file.getOriginalFilename()).toRealPath();  // Create a path to the image with the Post id

            Optional<User> user = userRepository.findById(authorid); //Get user from repository with the id from the request
            ObjectMapper objectMapper = new ObjectMapper(); // Create new object mapper
            Post post = objectMapper.readValue(request, Post.class); //Map the Request body to the Post class Fields
            post.setUser(user.get()); //Set the user to the post with the user found before
            post.getUser().setPassword(null); //Set the user password to null from the post
            post.setImageRef(path.toString());
            postRepository.save(post);

            return ResponseEntity.ok().body(post);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<List<Post>> getPostsByAuthor(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        List<Post> posts = postRepository.findByUser(user);
        posts.forEach((post -> post.getUser().setPassword(null)));
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getPosts() {
        List<Post> posts = postRepository.findAll();
        posts.forEach((post -> post.getUser().setPassword(null)));
        return  ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Integer id) {
        Optional<Post> post = postRepository.findById(id);
        if(post.isPresent()){
        postRepository.deleteById(post.get().getId());
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePost(@PathVariable Integer id, @RequestBody updateRequest request){
        Optional<Post> post = postRepository.findById(id);
        if(post.isPresent()){
            post.get().setTitle(request.title);
            post.get().setDescription(request.description);
            post.get().setImageRef(request.imageRef);
            postRepository.save(post.get());
        }
        return ResponseEntity.noContent().build();
    }




    record postRequest (
            String author,
            String description,
            String imageRef,
            String title,
            Integer author_id
    ){}

    record updateRequest(
            String description,
            String imageRef,
            String title
    ){}


}
