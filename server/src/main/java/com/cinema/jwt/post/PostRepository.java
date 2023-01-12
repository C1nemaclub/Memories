package com.cinema.jwt.post;



import com.cinema.jwt.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUser(Optional<User> user);

}
