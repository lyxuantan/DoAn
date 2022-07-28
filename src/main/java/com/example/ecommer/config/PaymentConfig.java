package com.example.ecommer.config;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class PaymentConfig {

    public static final String IPDEFAULT = "0:0:0:0:0:0:0:1";
    public static final String VERSION = "2.0.0";
    public static final String COMMAND = "2.0.0";
    public static final String TMMCOE = "T5UJ642D";
    public static final String CURRCODE = "VND";
    public static final String LOCALDEFAULT = "vn";
    public static final String RETURN_URL = "http://localhost:3000/#/watch/thanh-toan";
    public static final String CHECKSUM = "VMBASWSTRRJMGNJFGDICIYIHOBIENIYG";
    public static final String VNPAY_URRL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";


    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

//    public static final
}
