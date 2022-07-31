package com.example.ecommer.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User extends Base{

    @Column(name = "username", length = 30)
    private String username;

    @Column(name = "email_verified")
    private Boolean emailVerified = false;

    @Column(name = "full_name", length = 255)
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "address")

    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password", length = 255)
    @JsonIgnore
    private String password;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE })
    @JsonIgnore
    private List<CustomerOrder> customerOrder;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String fullName, String email, String address, String phoneNumber, String encode) {
        super();
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.password = encode;
    }
}
