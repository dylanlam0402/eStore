/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.domain.item;

import hcmue.cntt.estore.domain.common.BaseEntity;
import hcmue.cntt.estore.domain.uom.UnitOfMeasure;
import hcmue.cntt.estore.domain.store.Store;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Table(name = "items")
@Entity
public class Item extends BaseEntity {
    @NotNull
    private String name;
    private String itemCode;
    private String description;
    private int quantity;
    private Float price;

    @ManyToOne
    @JoinColumn(name= "store_id")
    private Store storeId;

    @ManyToOne
    @JoinColumn(name= "uoms_id")
    private UnitOfMeasure uomId;

    @ManyToOne
    @JoinColumn(name="item_types_id")
    private ItemType typeId;
    private String imageUrl;
    private boolean activated;
    private int size;
    private String color;
    private Float discount;
    private int ranking;
    private String activationKey;
    private String resetKey ;
    private String brand;






}
