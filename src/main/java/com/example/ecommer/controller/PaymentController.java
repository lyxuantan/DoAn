package com.example.ecommer.controller;

import com.example.ecommer.config.PaymentConfig;
import com.example.ecommer.dto.request.PaymentDTO;
import com.example.ecommer.dto.response.PaymentResponseDTO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping(value = "/payment")
@CrossOrigin(origins = "${watch.port}")
public class PaymentController {

    @PostMapping("create_payment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentDTO paymentDTO) throws UnsupportedEncodingException {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
//        String vnp_TxnRef = req.getParameter("order_id");
//        String vnp_TransDate = req.getParameter("trans_date");
//        String vnp_TmnCode = Config.vnp_TmnCode;
//        String vnp_IpAddr = Config.getIpAddress(req);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        String amount = String.valueOf(paymentDTO.getAmount());

//        Float amount = paymentDTO.getAmount() * 100;
        Map vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
//        vnp_Params.put("vnp_Command", "querydr");
        vnp_Params.put("vnp_TmnCode", PaymentConfig.TMMCOE);
        vnp_Params.put("vnp_Amount", paymentDTO.getAmountLong());
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TxnRef", paymentDTO.getIdOrder() + vnp_CreateDate);
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.RETURN_URL+"?amount="+paymentDTO.getAmountLong()+"&orderInfo="+paymentDTO.getIdOrder()+"&username="+paymentDTO.getUsername());
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_OrderInfo", "Kiem tra ket qua GD OrderId:" + paymentDTO.getIdOrder() + vnp_CreateDate);
        vnp_Params.put("vnp_IpAddr", PaymentConfig.IPDEFAULT);
        vnp_Params.put("vnp_Locale", "vn");

        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        //Build data to hash and querystring
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = String.valueOf(itr.next());
            String fieldValue = String.valueOf(vnp_Params.get(fieldName));
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.CHECKSUM ,  hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentConfig.VNPAY_URRL + "?" + queryUrl;
        com.google.gson.JsonObject job = new JsonObject();
        job.addProperty("code", "00");
        job.addProperty("message", "success");
        job.addProperty("data", paymentUrl);
        Gson gson = new Gson();
        PaymentResponseDTO result = new PaymentResponseDTO();
        result.setStatus("200");
        result.setMessage("success");
        result.setUrl(paymentUrl);
        return ResponseEntity.status(HttpStatus.OK).body(result);
//        resp.getWriter().write(gson.toJson(job));



//        String vnp_Version = "2.1.0";
//        String vnp_Command = "pay";
//
//        Float amount = paymentDTO.getAmount() * 100;
//        Map vnp_Params = new HashMap<>();
//        vnp_Params.put("vnp_Version", PaymentConfig.VERSION);
//        vnp_Params.put("vnp_Command", PaymentConfig.COMMAND);
//        vnp_Params.put("vnp_TmnCode", PaymentConfig.TMMCOE);
//        vnp_Params.put("vnp_Amount", String.valueOf(amount));
//        vnp_Params.put("vnp_CurrCode", "VND");
//        String bank_code = paymentDTO.getBankCode();
////        if (bank_code != null && !bank_code.isEmpty()) {
//            vnp_Params.put("vnp_BankCode", bank_code);
////        }
//        vnp_Params.put("vnp_TxnRef", String.valueOf(paymentDTO.getIdOrder()));
//        vnp_Params.put("vnp_OrderInfo", paymentDTO.getDescription());
//        vnp_Params.put("vnp_Locale", "vn");
//
//
//        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.RETURN_URL);
//        vnp_Params.put("vnp_IpAddr", PaymentConfig.IPDEFAULT);
//        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_CreateDate = formatter.format(cld.getTime());
//
//        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//        cld.add(Calendar.MINUTE, 15);
//        String vnp_ExpireDate = formatter.format(cld.getTime());
//        //Add Params of 2.1.0 Version
//        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
//        //Billing
//        List fieldNames = new ArrayList(vnp_Params.keySet());
//        Collections.sort(fieldNames);
//        StringBuilder hashData = new StringBuilder();
//        StringBuilder query = new StringBuilder();
//        Iterator itr = fieldNames.iterator();
//        while (itr.hasNext()) {
//            String fieldName = (String) itr.next();
//            String fieldValue = (String) vnp_Params.get(fieldName);
//            if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                //Build hash data
//                hashData.append(fieldName);
//                hashData.append('=');
//                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                //Build query
//                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
//                query.append('=');
//                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                if (itr.hasNext()) {
//                    query.append('&');
//                    hashData.append('&');
//                }
//            }
//        }
//        String queryUrl = query.toString();
//        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.CHECKSUM, hashData.toString());
//
//        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
//        String paymentUrl = PaymentConfig.VNPAY_URRL + "?" + queryUrl;
//        PaymentResponseDTO result = new PaymentResponseDTO();
//        result.setStatus("200");
//        result.setMessage("success");
//        result.setUrl(paymentUrl);
//        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
