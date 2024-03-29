package com.example.ecommer.constant;

public enum ErrorCode {
    SUCCESS("200", "Thành công"),
    FILE_UPDATE_LARGE("400", "File Quá rộng"),

    API_FAIL_UNKNOW("ERR001", "Lỗi hệ thống"),

    NOT_FOUND("ERR002", "Không tìm thấy thông tin"),
    NOT_FOUND_CATEGORY("ERR002", "Danh mục sản phẩm không tồn tại"),
    NOT_FOUND_PRODUCT("ERR002", "Sản phẩm không tồn tại"),
    NOT_FOUND_COLLECTION("ERR002", "Bộ sưu tập không tồn tại"),

    DELETE_ERROR("400", "Xóa thât bại"),
    UPLOAD_IMAGE_INVALID("ERR002", "Không phải định dạng file ảnh");

    ErrorCode(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    private String code;
    private String desc;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

}
