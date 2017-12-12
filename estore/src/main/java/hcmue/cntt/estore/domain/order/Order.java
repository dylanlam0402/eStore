package hcmue.cntt.estore.domain.order;

import hcmue.cntt.estore.domain.common.BaseEntity;
import hcmue.cntt.estore.domain.customer.Customer;
import hcmue.cntt.estore.domain.shipper.Shipper;
import hcmue.cntt.estore.domain.store.Store;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * @Author KietLam
 */

@Data
@NoArgsConstructor
@Table(name = "orders")
@Entity
public class Order extends BaseEntity{

    @ManyToOne
    @JoinColumn( name= "customer_id")
    private Customer customerId;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store storeId;

    private int orderNumber;

    private int payment_id;

    private Date orderDate;

    private Date shipDate;


    @ManyToOne
    @JoinColumn(name= "shipper_id")
    private Shipper shipperId;

    private float totalPrice;

    private int totalQty;


}
