package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.AddToCartRequest;
import com.example.ecommer.dto.response.CartResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.CustomerOrder;
import com.example.ecommer.model.CustomerOrderDetail;
import com.example.ecommer.model.Product;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.CustomerOrderDetailRepository;
import com.example.ecommer.repository.CustomerOrderRepository;
import com.example.ecommer.repository.ProductRepository;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.service.CustomerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerOrderServiceImpl implements CustomerOrderService {

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private CustomerOrderDetailRepository customerOrderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomerOrder findById(Long id) {
        return customerOrderRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }

    @Override
    public List<CartResponse> findByUserAndStatus(Long id, Integer status) {
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByUserAndStatus(user, status);
        List<CartResponse> cartResponses = new ArrayList<>();
        for(CustomerOrder cus: customerOrderList) {
            CartResponse cartResponse = new CartResponse();
            cartResponse.setId(cus.getId());
            cartResponse.setUser(cus.getUser());
            cartResponse.setCreateTime(cus.getCreateTime());
            cartResponse.setUpdateTime(cus.getUpdateTime());
            cartResponse.setTotal(totalPriceCustomerOrder(cus.getCustomerOrderDetails()));
            cartResponse.setSubTotal(totalPriceRefCustomerOrder(cus.getCustomerOrderDetails()));
            cartResponse.setStatus(cus.getStatus());
            cartResponses.add(cartResponse);
        }
        return cartResponses;
    }

    @Override
    public void addToCard(AddToCartRequest addToCartRequest) {
        User user = userRepository.findById(addToCartRequest.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByUserAndStatus(user, addToCartRequest.getStatus());
        Product product = productRepository.findById(addToCartRequest.getProductId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
        if (customerOrderList.size() != 0) {
            CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
            customerOrderDetail.setOrderId(customerOrderList.get(customerOrderList.size() - 1));
            customerOrderDetail.setProduct(product);
            customerOrderDetail.setQuantity(addToCartRequest.getQuantity());
            customerOrderDetail.setPrice(countPriceProductInCart(product, addToCartRequest.getQuantity()));
            customerOrderDetailRepository.save(customerOrderDetail);
        }
        else {
            CustomerOrder customerOrder = new CustomerOrder();
            customerOrder.setUser(user);
            customerOrder.setStatus(1);
            CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
            customerOrderDetail.setOrderId(customerOrder);
            customerOrderDetail.setProduct(product);
            customerOrderDetail.setQuantity(addToCartRequest.getQuantity());
            customerOrderDetail.setPrice(countPriceProductInCart(product, addToCartRequest.getQuantity()));
            customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, addToCartRequest.getQuantity()));
            customerOrderRepository.save(customerOrder);
            customerOrderDetailRepository.save(customerOrderDetail);

        }

    }

    @Override
    public void updateCard(AddToCartRequest addToCartRequest) {
        CustomerOrder customerOrder = customerOrderRepository.findById(addToCartRequest.getOrderId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        Product product = productRepository.findById(addToCartRequest.getProductId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
        if (customerOrder != null) {
            CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
            customerOrderDetail.setOrderId(customerOrder);
            customerOrderDetail.setProduct(product);
            customerOrderDetail.setQuantity(addToCartRequest.getQuantity());
            customerOrderDetail.setPrice(countPriceProductInCart(product, addToCartRequest.getQuantity()));
            customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, addToCartRequest.getQuantity()));
            customerOrderDetailRepository.save(customerOrderDetail);
        }
    }

    public Float countPriceProductInCart(Product product, Long quantity) {
        return product.getPriceSale() * quantity;
    }

    public Float countPriceRefProductInCart(Product product, Long quantity) {
        return product.getPriceRef() * quantity;
    }

    public Float totalPriceCustomerOrder(List<CustomerOrderDetail> customerOrderDetails) {
        Float total = 0.0f;
        for (int i = 0; i < customerOrderDetails.size() - 1; i++) {
            if(customerOrderDetails.get(i).getPrice() != null && customerOrderDetails.get(i).getTotal() != null) {
                total += customerOrderDetails.get(i).getPrice() * customerOrderDetails.get(i).getTotal();
            }
        }
        return total;
    }

    public Float totalPriceRefCustomerOrder(List<CustomerOrderDetail> customerOrderDetails) {
        Float total = 0.0f;
        for (int i = 0; i < customerOrderDetails.size() - 1; i++) {
            if(customerOrderDetails.get(i).getPriceRef() != null && customerOrderDetails.get(i).getTotal() != null) {
                total += customerOrderDetails.get(i).getPriceRef() * customerOrderDetails.get(i).getTotal();
            }
        }
//        total += countPriceRefProductInCart(product, quantity);
        return total;
    }

}
