package com.ukspeaks.payment.entity;

import lombok.*;
import java.math.BigInteger;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    String customerName;
    String email;
    String phoneNumber;
    BigInteger amount;


}
