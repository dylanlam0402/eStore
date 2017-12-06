package hcmue.cntt.estore.domain.uom;

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
@Table(name = "uoms")
@Entity
public class UnitOfMeasure extends BaseEntity {
    private String name;
    private int unitAmount;

}
