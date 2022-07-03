package com.example.ecommer.dto;

import com.example.ecommer.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Node {
    public List<Node> children = new ArrayList<>();
    public Node parent;
    public Category category;


};
