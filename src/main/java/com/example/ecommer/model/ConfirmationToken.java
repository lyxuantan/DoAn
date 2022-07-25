package com.example.ecommer.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "confirmation_token")
@AllArgsConstructor
@Setter
@Getter
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "confirmation_token")
    private String confirmationToken;

    @Column(name = "create_at")
    private Date createdDate;

    @Column(name = "expiry_date")
    private Date expiryDate;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    public ConfirmationToken() {}

    public ConfirmationToken(User user) {
        this.user = user;
        createdDate = new Date();
        expiryDate = calculateExpiryDate(10);
        confirmationToken = UUID.randomUUID().toString();
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Timestamp(calendar.getTime().getTime()));
        calendar.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(calendar.getTime().getTime());
    }

}
