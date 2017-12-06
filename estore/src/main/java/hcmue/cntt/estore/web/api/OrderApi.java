package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.domain.item.ItemType;
import hcmue.cntt.estore.service.OrderDetailService;
import hcmue.cntt.estore.service.OrderService;
import hcmue.cntt.estore.service.dto.OrderDto;
import hcmue.cntt.estore.service.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author KietLam
 */
@RestController
@RequestMapping
public class OrderApi {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping(value = "/save")
    public ResultDto saveItemType(@RequestBody OrderDto orderDto) {
        return orderService.saveOrder(orderDto);
    }

}
