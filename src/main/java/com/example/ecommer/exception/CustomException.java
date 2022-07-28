package com.example.ecommer.exception;

import com.example.ecommer.constant.ErrorCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomException extends RuntimeException {

	private String code;
	private String desc;
	private static final long serialVersionUID = 1L;

	public CustomException(String message) {
		super(message);
		this.code = "ERROR";
		this.desc = message;
	}

	public CustomException(String message, Exception exception) {
		super(message, exception);
	}

	public CustomException(ErrorCode error) {
		this.code = error.getCode();
		this.desc = error.getDesc();
	}

}
