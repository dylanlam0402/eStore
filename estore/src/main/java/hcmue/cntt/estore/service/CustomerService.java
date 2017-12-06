package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.customer.Customer;
import hcmue.cntt.estore.domain.customer.CustomerRepository;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author KietLam
 */
@Service
public class CustomerService extends BaseReturn {
    private final CustomerRepository customerRepository ;

    public CustomerService(CustomerRepository CustomerRepository) {
        this.customerRepository = CustomerRepository;
    }

    public ResultDto<List<Customer>> getCustomers(){
        List<Customer> result = customerRepository.findAll();
        return !result.isEmpty() ? Success(result, Constant.GET_SUCCESS): Fail(result,Constant.GET_FAIL);
    }
    public ResultDto saveCustomer(Customer Customer){

        Customer a = this.customerRepository.save(Customer);
        if( a == null){
            return Fail(Constant.SAVE_FAIL);
        }
        else {
            return Success(Constant.SAVE_SUCCESS);}

    }

    public ResultDto deleteCustomer(Customer customer){
        customerRepository.delete(customer);
        return Success("Delete successfully");
    }
}

