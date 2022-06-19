package com.example.ecommer.dto;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.exception.CustomException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class ApiResponse {
    private Object data;
    private String errorCode = "200";
    private String errorDesc = "Thành công";

    public ApiResponse(CustomException e) {
        this.errorCode = e.getCode();
        this.errorDesc = e.getDesc();
    }
    public ApiResponse(Object data) {
        this.data = data;
    }

    public ApiResponse(ErrorCode data) {
        this.errorCode = data.getCode();
        this.errorDesc = data.getDesc();
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDesc() {
        return errorDesc;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
    }
}
