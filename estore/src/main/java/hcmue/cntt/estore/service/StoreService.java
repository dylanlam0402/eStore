package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.store.Store;
import hcmue.cntt.estore.domain.store.StoreRepository;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class StoreService extends BaseReturn{
    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public ResultDto<List<Store>> getStores(){
        List<Store> result = storeRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }
    public ResultDto saveStore(Store store){

        store.setActivated(true);
        Store a = this.storeRepository.save(store );
        if( a == null){
            return Fail(Constant.SAVE_FAIL);
        }
        else {
            return Success(Constant.SAVE_SUCCESS);}

    }


    public ResultDto deleteStore(Store Store){
        storeRepository.delete(Store);
        return Success("Delete successfully");
    }
}

