package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.domain.shipper.Shipper;
import hcmue.cntt.estore.service.ShipperService;
import hcmue.cntt.estore.service.ShipperService;
import hcmue.cntt.estore.service.dto.KeywordDto;
import hcmue.cntt.estore.service.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author KietLam
 */
@RestController
@RequestMapping("/api/shipper")
public class ShipperApi {
    @Autowired
    private ShipperService shipperService;

    @GetMapping("/getList")
    public ResultDto<List<Shipper>> getShippers() {

        return shipperService.getShippers();
    }
    @PostMapping("/save")
    public ResultDto<List<Shipper>> saveShipper(@RequestBody Shipper shipper) {
        return shipperService.saveShipper(shipper);
    }



    @PostMapping("/delete")
    public ResultDto deleteShipper(@RequestBody Shipper shipper){
        return shipperService.deleteShipper(shipper);
    }
}
