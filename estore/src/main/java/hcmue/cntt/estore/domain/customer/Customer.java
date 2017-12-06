package hcmue.cntt.estore.domain.customer;

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
@Table(name = "customer")
@Entity
public class Customer  extends BaseEntity{
    private String firstName;
    private String lastName;
    private String address;

    private String phoneNumber;

    private String city;

}
