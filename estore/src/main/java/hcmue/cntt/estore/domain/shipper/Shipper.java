package hcmue.cntt.estore.domain.shipper;

import hcmue.cntt.estore.domain.common.BaseEntity;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @Author KietLam
 */
@NoArgsConstructor
@Table(name = "shipper")
@Entity
public class Shipper  extends BaseEntity{
    private String name;
    private String shipType;
    private String phoneNumber;
}
