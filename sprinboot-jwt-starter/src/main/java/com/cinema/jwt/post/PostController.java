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
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/posts")
public class PostController {

    private static final String UPLOAD_FOLDER = "src/web/images/";
    private static final String UPLOAD_DIR = "src/main/resources/static/images/";
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PostService postService;

    public PostController(PostRepository postRepository,
                          UserRepository userRepository, PostService postService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postService = postService;
    }


    @PostMapping("/new")
    public ResponseEntity<String>  uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
        System.out.println(file);
        FileOutputStream output  = new FileOutputStream(UPLOAD_DIR + file.getOriginalFilename());
        output.write(file.getBytes());
        Path path = Path.of(UPLOAD_DIR + file.getOriginalFilename());
        return ResponseEntity.ok("http://localhost:4000/"+ file.getOriginalFilename());
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestParam("file")MultipartFile file, @RequestParam("body") String request, @RequestParam("authorid") Integer authorid) throws JsonProcessingException, FileNotFoundException {
        try{

            FileOutputStream imageOutput = new FileOutputStream(UPLOAD_DIR  + file.getOriginalFilename());
            imageOutput.write(file.getBytes()); //Write

            Optional<User> user = userRepository.findById(authorid); //Get user from repository with the id from the request
            ObjectMapper objectMapper = new ObjectMapper(); // Create new object mapper
            Post post = objectMapper.readValue(request, Post.class); //Map the Request body to the Post class Fields
            post.setUser(user.get()); //Set the user to the post with the user found before
            post.getUser().setPassword(null); //Set the user password to null from the post
            post.setImageRef(file.getOriginalFilename());
            postRepository.save(post);

            return ResponseEntity.ok().body(post);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer id, @RequestParam("file") MultipartFile file, @RequestParam("body") String request) throws IOException {
        return postService.editPost(file, request, id);
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
