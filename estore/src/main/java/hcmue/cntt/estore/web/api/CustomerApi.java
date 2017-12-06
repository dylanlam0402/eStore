package hcmue.cntt.estore.web.api;


import hcmue.cntt.estore.domain.customer.Customer;
import hcmue.cntt.estore.service.CustomerService;
import hcmue.cntt.estore.service.dto.KeywordDto;
import hcmue.cntt.estore.service.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author KietLam
 */
@RestController
@RequestMapping("/api/customer")
public class CustomerApi {
    @Autowired
    private CustomerService customerService;
    @GetMapping("/getList")
    public ResultDto<List<Customer>> getCustomers() {

        return customerService.getCustomers();
    }
    @PostMapping("/save")
    public ResultDto<List<Customer>> saveCustomer(@RequestBody Customer item) {
        return customerService.saveCustomer(item);
    }

    @PostMapping("/delete")
    public ResultDto deleteCustomer(@RequestBody Customer item){
        return customerService.deleteCustomer(item);
    }
}
