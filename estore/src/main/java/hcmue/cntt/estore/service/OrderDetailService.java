package hcmue.cntt.estore.service;


import hcmue.cntt.estore.domain.order.OrderDetail;
import hcmue.cntt.estore.domain.order.OrderDetailRepository;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class OrderDetailService extends BaseReturn {

    private final OrderDetailRepository orderDetailRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }


    public ResultDto<List<OrderDetail>> getOrderDetails() {
        List<OrderDetail> result = orderDetailRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }

    public ResultDto saveOrderDetail(OrderDetail orderDetail) {

        OrderDetail a = this.orderDetailRepository.save(orderDetail);
        if (a == null) {
            return Fail(Constant.SAVE_FAIL);
        } else {
            return Success(Constant.SAVE_SUCCESS);
        }

    }


    public ResultDto deleteOrderDetail(OrderDetail orderDetail) {
        orderDetailRepository.delete(orderDetail);
        return Success("Delete successfully");
    }
}
