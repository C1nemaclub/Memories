package com.cinema.jwt.post;


import com.cinema.jwt.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "post")
public class Post {


    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User user;


    private String title;
    private String description;
    private String author;
    private String imageRef;

}
