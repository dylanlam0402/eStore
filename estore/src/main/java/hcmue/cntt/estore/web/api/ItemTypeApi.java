package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.domain.item.ItemType;
import hcmue.cntt.estore.service.ItemTypeService;
import hcmue.cntt.estore.service.UserService;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.service.dto.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author KietLam
 */
@RestController
@RequestMapping("/api/itemtypes")
public class ItemTypeApi {
    @Autowired
    private ItemTypeService itemTypeService;

    @PostMapping(value = "/save")
    public ResultDto saveItemType(@RequestBody ItemType itemType) {
        return itemTypeService.save(itemType);
    }


    @GetMapping(value="/getList")
    public ResultDto<List<ItemType>> getItemTypes(){
        return itemTypeService.getItemTypes();
    }

    @PostMapping(value="/delete")
    public ResultDto<ItemType> deleteItemType(@RequestBody ItemType itemType){
        return itemTypeService.delete(itemType);
    }
}
