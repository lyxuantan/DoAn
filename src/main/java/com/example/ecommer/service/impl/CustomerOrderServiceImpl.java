package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.AddToCartRequest;
import com.example.ecommer.dto.request.PaymentDTO;
import com.example.ecommer.dto.response.CartResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.*;
import com.example.ecommer.repository.*;
import com.example.ecommer.security.jwt.JwtUtils;
import com.example.ecommer.service.CustomerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    private OrderHistoryRepository orderHistoryRepository;

    @Override
    public CustomerOrder findById(Long id) {
        return customerOrderRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }

    @Override
    public List<CartResponse> findByUserAndStatus(Long id, Boolean isPaid) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByUserAndIsPaid(user, isPaid);
        List<CartResponse> cartResponses = new ArrayList<>();
        for (CustomerOrder cus : customerOrderList) {
            CartResponse cartResponse = new CartResponse();
            cartResponse.setId(cus.getId());
            cartResponse.setUser(cus.getUser());
            cartResponse.setCreateTime(cus.getCreateTime());
            cartResponse.setUpdateTime(cus.getUpdateTime());
            cartResponse.setTotal(totalPriceCustomerOrder(cus.getCustomerOrderDetails()));
            cartResponse.setSubTotal(totalPriceRefCustomerOrder(cus.getCustomerOrderDetails()));
            cartResponse.setStatus(cus.getStatus());
            cartResponse.setCustomerOrderDetails(cus.getCustomerOrderDetails());
            cartResponses.add(cartResponse);
        }
        return cartResponses;
    }

    public Page<CustomerOrder> findByUserAndStatusPage(Boolean isPaid, Integer pageNo, Integer limit) {
        PageRequest pageable = PageRequest.of(pageNo - 1, limit, Sort.by("id").descending());
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        return customerOrderRepository.findAllByUserAndIsPaid(user, isPaid, pageable);

    }

    public List<CustomerOrder> findAllCustomerOrderIsPaid() {
        return customerOrderRepository.findAllListCustomerOrderIsPaid();

    }


    @Override
    public void addToCard(AddToCartRequest addToCartRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByUserAndIsPaid(user, addToCartRequest.getIsPaid());
        List<CustomerOrderDetail> customerOrderDetailList = new ArrayList<>();
        System.out.println(addToCartRequest.getCustomerOrderDetails());
        if (customerOrderList.size() != 0) {
            addToCartRequest.getCustomerOrderDetails().forEach(item -> {
                Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
                CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                customerOrderDetail.setOrderId(customerOrderList.get(customerOrderList.size() - 1));
                customerOrderDetail.setProduct(product);
                customerOrderDetail.setQuantity(item.getQuantity());
                customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                customerOrderDetailList.add(customerOrderDetail);
                customerOrderDetailRepository.save(customerOrderDetail);
            });
            CustomerOrder customerOrder = customerOrderList.get(customerOrderList.size() - 1);
            customerOrder.setCustomerOrderDetails(customerOrderDetailList);
            customerOrder.setTotal((long) customerOrderDetailList.size());
            customerOrder.setPrice(totalPriceCustomerOrder(customerOrderDetailList));
            customerOrder.setStatus(addToCartRequest.getStatus());
            customerOrder.setIsPaid(addToCartRequest.getIsPaid());
            customerOrderRepository.save(customerOrder);
        } else {
            CustomerOrder customerOrder = new CustomerOrder();
            customerOrder.setUser(user);
            customerOrder.setStatus(addToCartRequest.getStatus());
            customerOrder.setIsPaid(false);
            addToCartRequest.getCustomerOrderDetails().forEach(item -> {
                Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
                CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                customerOrderDetail.setOrderId(customerOrder);
                customerOrderDetail.setProduct(product);
                customerOrderDetail.setQuantity(item.getQuantity());
                customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                customerOrderDetailList.add(customerOrderDetail);
                customerOrderDetailRepository.save(customerOrderDetail);
            });
            customerOrder.setCustomerOrderDetails(customerOrderDetailList);
            customerOrder.setTotal((long) customerOrderDetailList.size());
            customerOrder.setPrice(totalPriceCustomerOrder(customerOrderDetailList));
            customerOrderRepository.save(customerOrder);
        }
    }

    @Override
    public void updateCard(AddToCartRequest addToCartRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));

        List<CustomerOrderDetail> customerOrderDetailList = new ArrayList<>();
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByUserAndIsPaid(user, false);

        if (addToCartRequest.getOrderId() != null) {
            Optional<CustomerOrder> customerOrder = customerOrderRepository.findById(addToCartRequest.getOrderId());
            if (customerOrder.isPresent()) {
                addToCartRequest.getCustomerOrderDetails().forEach(item -> {
                    Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
                    if (item.getId() != null) {
                        Optional<CustomerOrderDetail> customerOrderDetailExit = customerOrderDetailRepository.findById(item.getId());
                        if (customerOrderDetailExit.isPresent()) {
                            customerOrderDetailExit.get().setId(item.getId());
                            customerOrderDetailExit.get().setOrderId(customerOrderList.get(customerOrderList.size() - 1));
                            customerOrderDetailExit.get().setProduct(product);
                            customerOrderDetailExit.get().setQuantity(item.getQuantity());
                            customerOrderDetailExit.get().setPrice(countPriceProductInCart(product, item.getQuantity()));
                            customerOrderDetailExit.get().setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                            customerOrderDetailList.add(customerOrderDetailExit.get());
                            customerOrderDetailRepository.save(customerOrderDetailExit.get());
                        } else {
                            CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                            customerOrderDetail.setId(item.getId());
                            customerOrderDetail.setOrderId(customerOrder.get());
                            customerOrderDetail.setProduct(product);
                            customerOrderDetail.setQuantity(item.getQuantity());
                            customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                            customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                            customerOrderDetailList.add(customerOrderDetail);
                            customerOrderDetailRepository.save(customerOrderDetail);
                        }
                    } else {
                        CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                        customerOrderDetail.setId(item.getId());
                        customerOrderDetail.setOrderId(customerOrder.get());
                        customerOrderDetail.setProduct(product);
                        customerOrderDetail.setQuantity(item.getQuantity());
                        customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                        customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                        customerOrderDetailList.add(customerOrderDetail);
                        customerOrderDetailRepository.save(customerOrderDetail);
                    }
                });
                customerOrder.get().setId(addToCartRequest.getOrderId());
                customerOrder.get().setCustomerOrderDetails(customerOrderDetailList);
                customerOrder.get().setTotal((long) customerOrderDetailList.size());
                customerOrder.get().setPrice(totalPriceCustomerOrder(customerOrderDetailList));
                customerOrder.get().setStatus(addToCartRequest.getStatus());
                customerOrder.get().setIsPaid(addToCartRequest.getIsPaid());
                customerOrderRepository.save(customerOrder.get());
            } else {
                CustomerOrder customerOrderNew = new CustomerOrder();
                customerOrderNew.setUser(user);
                customerOrderNew.setStatus(addToCartRequest.getStatus());
                customerOrderNew.setIsPaid(false);
                addToCartRequest.getCustomerOrderDetails().forEach(item -> {
                    Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
                    if (item.getId() != null) {
                        Optional<CustomerOrderDetail> customerOrderDetailExit = customerOrderDetailRepository.findById(item.getId());
                        if (customerOrderDetailExit.isPresent()) {
                            customerOrderDetailExit.get().setId(item.getId());
                            customerOrderDetailExit.get().setOrderId(customerOrderNew);
                            customerOrderDetailExit.get().setProduct(product);
                            customerOrderDetailExit.get().setQuantity(item.getQuantity());
                            customerOrderDetailExit.get().setPrice(countPriceProductInCart(product, item.getQuantity()));
                            customerOrderDetailExit.get().setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                            customerOrderDetailList.add(customerOrderDetailExit.get());
                            customerOrderDetailRepository.save(customerOrderDetailExit.get());
                        } else {
                            CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                            customerOrderDetail.setId(item.getId());
                            customerOrderDetail.setOrderId(customerOrder.get());
                            customerOrderDetail.setProduct(product);
                            customerOrderDetail.setQuantity(item.getQuantity());
                            customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                            customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                            customerOrderDetailList.add(customerOrderDetail);
                            customerOrderDetailRepository.save(customerOrderDetail);
                        }
                    } else {
                        CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                        customerOrderDetail.setId(item.getId());
                        customerOrderDetail.setOrderId(customerOrder.get());
                        customerOrderDetail.setProduct(product);
                        customerOrderDetail.setQuantity(item.getQuantity());
                        customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                        customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                        customerOrderDetailList.add(customerOrderDetail);
                        customerOrderDetailRepository.save(customerOrderDetail);
                    }
                });
                customerOrderNew.setCustomerOrderDetails(customerOrderDetailList);
                customerOrderNew.setTotal((long) customerOrderDetailList.size());
                customerOrderNew.setPrice(totalPriceCustomerOrder(customerOrderDetailList));
                customerOrderRepository.save(customerOrderNew);
            }
        } else {
            CustomerOrder customerOrderNew = new CustomerOrder();
            customerOrderNew.setUser(user);
            customerOrderNew.setStatus(addToCartRequest.getStatus());
            customerOrderNew.setIsPaid(false);
//            customerOrderNew.setTotal((long) customerOrderDetailList.size());
//            customerOrderNew.setPrice(totalPriceCustomerOrder(customerOrderDetailList));
            customerOrderRepository.save(customerOrderNew);
            addToCartRequest.getCustomerOrderDetails().forEach(item -> {
                Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PRODUCT));
                CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
                customerOrderDetail.setOrderId(customerOrderNew);
                customerOrderDetail.setProduct(product);
                customerOrderDetail.setQuantity(item.getQuantity());
                customerOrderDetail.setPrice(countPriceProductInCart(product, item.getQuantity()));
                customerOrderDetail.setPriceRef(countPriceRefProductInCart(product, item.getQuantity()));
                customerOrderDetailList.add(customerOrderDetail);
                customerOrderDetailRepository.save(customerOrderDetail);
            });
            customerOrderNew.setTotal((long) customerOrderDetailList.size());
            customerOrderNew.setPrice(totalPriceCustomerOrder(customerOrderDetailList));
            customerOrderRepository.save(customerOrderNew);
//            customerOrderNew.setCustomerOrderDetails(customerOrderDetailList);

        }
    }

    @Override
    public void deleteCustomerOrderDetail(Long id) {
        Optional<CustomerOrderDetail> customerOrderDetail = customerOrderDetailRepository.findById(id);
        if (customerOrderDetail.isPresent()) {
            customerOrderDetailRepository.deleteById(id);
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_CUSTOMER_ORDER_DETAIL);
        }
    }

    @Override
    public void paymentCustomerOrder(PaymentDTO customerOrder) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        Optional<CustomerOrder> customerOrderExit = customerOrderRepository.findById(customerOrder.getIdOrder());
        if (customerOrderExit.isPresent()) {
            customerOrderExit.get().getCustomerOrderDetails().forEach(item -> {
                if (item.getQuantity() != null) {
                    if (item.getProduct().getSaleNumber() != null) {
                        item.getProduct().setSaleNumber(item.getProduct().getSaleNumber() + item.getQuantity());
                    }
                    if (item.getProduct().getTotal() != null) {
                        item.getProduct().setTotal(item.getProduct().getTotal() - item.getQuantity());
                    }
                }
                productRepository.save(item.getProduct());
            });
        }

        List<CustomerOrder> listCustomerOrderIsPaid = customerOrderRepository.findAllByUserAndIsPaid(user, false);
        listCustomerOrderIsPaid.forEach(item -> {
            item.setIsPaid(true);
            customerOrderRepository.save(item);

        });
        OrderHistory orderHistory = new OrderHistory();
        Date date = new Date();
        orderHistory.setCustomerOrder(customerOrderExit.get());
        orderHistory.setDate(date.getTime());
        orderHistory.setPrice(customerOrder.getAmount());
//            orderHistory.set
        orderHistoryRepository.save(orderHistory);
//        customerOrderRepository.updatePayment(user.getUsername());
    }

    public void onChangeStatus(OrderHistory orderHistory) {
        Optional<OrderHistory> orderHistoryExit = orderHistoryRepository.findById(orderHistory.getId());
        if (orderHistoryExit.isPresent()) {
            orderHistoryExit.get().setStatus(orderHistory.getStatus());
            orderHistoryRepository.save(orderHistoryExit.get());
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
            if (customerOrderDetails.get(i).getPrice() != null && customerOrderDetails.get(i).getQuantity() != null) {
                total += customerOrderDetails.get(i).getPrice() * customerOrderDetails.get(i).getQuantity();
            }
        }
        return total;
    }


    public Float totalPriceRefCustomerOrder(List<CustomerOrderDetail> customerOrderDetails) {
        Float total = 0.0f;
        for (int i = 0; i < customerOrderDetails.size() - 1; i++) {
            if (customerOrderDetails.get(i).getPriceRef() != null && customerOrderDetails.get(i).getQuantity() != null) {
                total += customerOrderDetails.get(i).getPriceRef() * customerOrderDetails.get(i).getQuantity();
            }
        }
//        total += countPriceRefProductInCart(product, quantity);
        return total;
    }

    List<CustomerOrder> customerOrderListByUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return customerOrderRepository.findAllByUser(user.get());
    }


}
