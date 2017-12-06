package hcmue.cntt.estore.service.dto;

import hcmue.cntt.estore.domain.order.Order;
import hcmue.cntt.estore.domain.order.OrderDetail;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @Author KietLam
 */
@NoArgsConstructor
@Data
public class OrderDto {
    private Order order;
    private List<OrderDetail> orderDetails;


}
