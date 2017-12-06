package hcmue.cntt.estore.domain.item;

import hcmue.cntt.estore.domain.common.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @Author KietLam
 */
@Data
@NoArgsConstructor
@Table(name = "item_types")
@Entity
public class ItemType extends BaseEntity {
    private String name;
    private String description;
    private boolean activated;

}
