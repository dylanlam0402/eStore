package hcmue.cntt.estore.domain.store;

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
@Table(name = "store")
@Entity
public class Store extends BaseEntity {
    private String storeCode;
    private String name;
    private String address;
    private String phone;
    private Boolean activated;

}
