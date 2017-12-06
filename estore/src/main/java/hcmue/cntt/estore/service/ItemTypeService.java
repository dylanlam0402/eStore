package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.item.Item;
import hcmue.cntt.estore.domain.item.ItemType;
import hcmue.cntt.estore.domain.item.ItemTypeRepository;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class ItemTypeService extends BaseReturn{

    private final ItemTypeRepository itemTypeRepository ;

    public ItemTypeService(ItemTypeRepository itemTypeRepository) {
        this.itemTypeRepository = itemTypeRepository;
    }

    public ResultDto save(ItemType itemType){
        ItemType i = this.itemTypeRepository.save(itemType);
        return i!=null ? Success(Constant.SAVE_SUCCESS) : Fail(Constant.SAVE_FAIL);
    }

    public ResultDto<List<ItemType>> getItemTypes(){
        List<ItemType> result = itemTypeRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }
}
