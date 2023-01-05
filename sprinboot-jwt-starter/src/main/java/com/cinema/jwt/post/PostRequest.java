package com.cinema.jwt.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PostRequest {
    private String title;
    private String description;
    private String imageRef;
    private String author;
    private Integer author_id;

}
