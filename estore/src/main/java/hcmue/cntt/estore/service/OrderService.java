package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.item.Item;
import hcmue.cntt.estore.domain.item.ItemRepository;
import hcmue.cntt.estore.domain.order.Order;
import hcmue.cntt.estore.domain.order.OrderDetail;
import hcmue.cntt.estore.domain.order.OrderDetailRepository;
import hcmue.cntt.estore.domain.order.OrderRepository;
import hcmue.cntt.estore.domain.shipper.Shipper;
import hcmue.cntt.estore.domain.shipper.ShipperRepository;
import hcmue.cntt.estore.domain.store.StoreRepository;
import hcmue.cntt.estore.service.dto.OrderDto;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class OrderService extends BaseReturn {
    private final OrderRepository orderRepository ;
    private final OrderDetailRepository orderDetailRepository ;
    private final ItemRepository itemRepository;
    private final ShipperRepository shipperRepository;
    private final StoreRepository storeRepository;

    public OrderService(OrderRepository orderRepository,OrderDetailRepository orderDetailRepository, ItemRepository itemRepository, ShipperRepository shipperRepository, StoreRepository storeRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.itemRepository = itemRepository;
        this.shipperRepository =  shipperRepository;
        this.storeRepository = storeRepository;
    }

    public ResultDto<List<Order>> getOrders(){
        List<Order> result = orderRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }

    public ResultDto saveOrder(OrderDto orderDto){
            orderDto.getOrder().setShipperId(shipperRepository.findOne(new Long(1)));
            orderDto.getOrder().setStoreId(storeRepository.findOne(new Long(1)));
            Order order = orderRepository.save(orderDto.getOrder());

            float totalPrice = 0 ;
            for(OrderDetail orderDetail: orderDto.getOrderDetails()){
                orderDetail.setOrderId(order);
                if(orderDetail!= null){
                    calcStock(orderDetail.getItemsId().getId(),orderDetail.getQty());
                }

                orderDetailRepository.save(orderDetail);
            }
            return order != null ? Success(Constant.SAVE_SUCCESS) : Fail(Constant.SAVE_FAIL);
    }

    private void calcStock(Long id,int qty){
        Item item = itemRepository.getOne(id);
        int itemQty = item.getQuantity();
        item.setQuantity(itemQty- qty);
        itemRepository.save(item);
    }


    public ResultDto deleteOrder(Order Order){
        orderRepository.delete(Order);
        return Success("Delete successfully");
    }
}
