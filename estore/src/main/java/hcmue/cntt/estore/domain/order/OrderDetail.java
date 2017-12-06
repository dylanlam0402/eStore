package hcmue.cntt.estore.domain.order;

import com.fasterxml.jackson.databind.ser.Serializers;
import hcmue.cntt.estore.domain.common.BaseEntity;
import hcmue.cntt.estore.domain.item.Item;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @Author KietLam
 */

@Data
@NoArgsConstructor
@Table(name = "order_detail")
@Entity
public class OrderDetail extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order orderId ;

    @ManyToOne
    @JoinColumn(name="items_id")
    private Item itemsId;
    private int qty;
    private float unitPrice;
    private float totalPrice;
}
