package com.ukspeaks.payment.entity;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    String secretKey;
    String razorpayOrderId;
    String applicationFee;
    String secretId;
    String pgName;

}
