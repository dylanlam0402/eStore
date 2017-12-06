package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.domain.store.Store;
import hcmue.cntt.estore.service.StoreService;
import hcmue.cntt.estore.service.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author KietLam
 */
@RestController
@RequestMapping("api/store")
public class StoreApi {
    @Autowired
    private StoreService storeService;
    @GetMapping("/getList")
    public ResultDto<List<Store>> getStores() {

        return storeService.getStores();
    }
    @PostMapping("/save")
    public ResultDto<List<Store>> saveStore(@RequestBody Store item) {
        return storeService.saveStore(item);
    }

    @PostMapping("/delete")
    public ResultDto deleteStore(@RequestBody Store item){
        return storeService.deleteStore(item);
    }
}
