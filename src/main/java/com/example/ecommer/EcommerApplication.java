package com.example.ecommer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EcommerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerApplication.class, args);
    }

}
