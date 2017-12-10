package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.item.Item;
import hcmue.cntt.estore.domain.item.ItemRepository;
import hcmue.cntt.estore.domain.item.ItemType;
import hcmue.cntt.estore.domain.item.ItemTypeRepository;
import hcmue.cntt.estore.service.dto.BrandDto;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class ItemService extends BaseReturn{
    private final ItemRepository itemRepository ;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public ResultDto<List<Item>> getItems(){
        List<Item> result= itemRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }
    public ResultDto saveItem(Item item){
        item.setSize(0);
        item.setRanking(0);
        item.setActivated(true);
        Item a = this.itemRepository.save(item);

        if( a == null){
            return Fail(Constant.SAVE_FAIL);
        }
        else {
            return Success(Constant.SAVE_SUCCESS);
        }

    }
    public  ResultDto<List<Item>> findItemsContainName(String name){
        List<Item> result = itemRepository.findAllByNameContaining(name);
        return !result.isEmpty() ? Success(result,"Get item successfully") : Fail(result,"get item fail");
    }

    public ResultDto deleteItem(Item item){
        itemRepository.delete(item);
        return Success("Delete successfully");
    }

    public ResultDto<List<Item>> findByTypeId(ItemType itemType){
        List<Item> result = itemRepository.findAllByTypeId(itemType);
        if(result.isEmpty()){
            return Fail(result,Constant.GET_FAIL);
        }
        else{
            return Success(result,Constant.GET_SUCCESS);
        }
    }

    public ResultDto<BrandDto> getBrand(){
        List<String> result = itemRepository.getDistinctBrand();
        BrandDto brandDto = new BrandDto();
        brandDto.setBrand(result);
        if(result.isEmpty()){
            return Fail(brandDto,Constant.GET_FAIL);
        }
        else{
            return Success(brandDto,Constant.GET_SUCCESS);
        }
    }

    public ResultDto<List<Item>> search(Item item){
        List<Item> result = itemRepository.search(item);
        if(result.isEmpty()){
            return Fail(result,Constant.GET_FAIL);
        }
        else{
            return Success(result,Constant.GET_SUCCESS);
        }
    }
    public  ResultDto<Item> getItemById(Long id){
        Item result = itemRepository.findOne(id);
        if(result == null){
            return Fail(result,Constant.GET_FAIL);
        }
        else{
            return Success(result,Constant.GET_SUCCESS);
        }
    }

}
