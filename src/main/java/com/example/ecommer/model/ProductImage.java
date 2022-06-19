package com.example.ecommer.model;

import com.example.ecommer.util.AmazonUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Table(name = "product_image")
@Entity
@NoArgsConstructor @AllArgsConstructor
@Setter @Getter
@Builder
public class ProductImage  implements Serializable  {

    private static final long serialVersionUID = 4641853311314844969L;

    public static final int HINH_DAI_DIEN = 1;
    public static final int NOT_HINH_DAI_DIEN = 0;

    public static final int HINH_SLIDER = 1;
    public static final int NOT_HINH_SLIDER = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "file")
    private String file;

    @Column(name = "`name`")
    private String name;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "is_president")
    private Boolean isPresident;

    @Column(name = "is_slider")
    private Boolean isSlider;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name="create_time")
    private Date createTime;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id", insertable=false, updatable=false)
    @JsonIgnore
    private Product product;

    public void createImgUrl() {
        file = AmazonUtil.Util.host + Product.UPLOAD_PATH + file;
    }

    @Lob
    private byte[] data;
}
