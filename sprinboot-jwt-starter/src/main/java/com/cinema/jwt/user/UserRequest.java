package com.cinema.jwt.user;

import com.cinema.jwt.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserRequest
{
    private String email;
    private String firstname;
    private String lastname;
    private String avatar;
    private Set posts;


}
