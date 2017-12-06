package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.shipper.Shipper;
import hcmue.cntt.estore.domain.shipper.ShipperRepository;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class ShipperService  extends BaseReturn{
    private final ShipperRepository shipperRepository ;

    public ShipperService(ShipperRepository shipperRepository) {
        this.shipperRepository = shipperRepository;
    }

    public ResultDto<List<Shipper>> getShippers(){
        List<Shipper> result = shipperRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }
    public ResultDto saveShipper(Shipper shipper){

        Shipper a = this.shipperRepository.save(shipper);
        if( a == null){
            return Fail(Constant.SAVE_FAIL);
        }
        else {
            return Success(Constant.SAVE_SUCCESS);}

    }

    public ResultDto deleteShipper(Shipper shipper){
        shipperRepository.delete(shipper);
        return Success("Delete successfully");
    }
}
