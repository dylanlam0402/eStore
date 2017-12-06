package hcmue.cntt.estore.domain.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * @Author KietLam
 */
public interface ItemRepository extends JpaRepository<Item,Long> {
     String searchQuery = "SELECT m FROM Item m WHERE "+
"( m.name LIKE %:#{#model.name}% OR ISNULL(:#{#model.name}) = true) "
            + "AND ( m.brand LIKE :#{#model.brand} OR ISNULL(:#{#model.brand}) = true) "
            + "AND ( m.typeId = %:#{#model.typeId}% OR ISNULL(:#{#model.typeId}) = true) "
            + "AND ( m.discount = :#{#model.discount} OR ISNULL(:#{#model.discount}) = true) "
            ;

    @Query(searchQuery)
    List<Item> search(@Param("model") Item item);

    List<Item> findAllByActivated(Boolean active);

    List<Item> findAllByNameContaining(String name);

    List<Item> findAllByStoreId(Long storeId);

    List<Item> findAllByTypeId(ItemType itemType);

    List<Item> findAllByBrand(String brand);

    @Query("Select distinct (i.brand) from Item i ")
    List<String> getDistinctBrand();
}
