package com.cinema.jwt.post;

import com.cinema.jwt.user.User;
import com.cinema.jwt.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
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
