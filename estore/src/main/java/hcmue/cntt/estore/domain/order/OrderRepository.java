package hcmue.cntt.estore.domain.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @Author KietLam
 */
public interface OrderRepository extends JpaRepository<Order,Long> {
        List<Order> findOrderByStoreId(Long storeId);
}
