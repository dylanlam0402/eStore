package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.domain.item.Item;
import hcmue.cntt.estore.domain.item.ItemType;
import hcmue.cntt.estore.domain.store.Store;
import hcmue.cntt.estore.domain.uom.UnitOfMeasure;
import hcmue.cntt.estore.service.ItemService;
import hcmue.cntt.estore.service.dto.BrandDto;
import hcmue.cntt.estore.service.dto.KeywordDto;
import hcmue.cntt.estore.service.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.util.List;

/**
 * @Author KietLam
 */
@RestController
@RequestMapping("/api/item")
public class ItemApi {

    @Autowired
    private ItemService itemService;
    @GetMapping("/getList")
    public ResultDto<List<Item>> getItems() {

        return itemService.getItems();
    }
    @PostMapping("/save")
    public ResultDto<List<Item>> saveItem(@RequestBody Item item) {


        return itemService.saveItem(item);
    }



    @PostMapping("/getByTypeId")
    public ResultDto<List<Item>> getByTypeId(@RequestBody ItemType itemType){
        return itemService.findByTypeId(itemType);
    }


    @PostMapping("/getItemsByName")
    public ResultDto<List<Item>> getItemsByName(@RequestBody KeywordDto keywordDto){
        return itemService.findItemsContainName(keywordDto.getKeyword());
    }

    @PostMapping("/delete")
    public ResultDto deleteItem(@RequestBody Item item){
        return itemService.deleteItem(item);
    }

    @GetMapping("/getBrands")
    public ResultDto<List<String>> getBrands(){
        return itemService.getBrand();
    }


    @PostMapping("/getOne")
    public  ResultDto<Item> getItemById(@RequestBody Item item){
        return itemService.getItemById(item.getId());
    }

    @PostMapping("/search")
    public ResultDto<List<Item>> search(@RequestBody Item item){

        item.setUomId(new UnitOfMeasure());
        item.setStoreId(new Store());
        return itemService.search(item);
    }
}
