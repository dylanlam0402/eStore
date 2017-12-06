package hcmue.cntt.estore.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author KietLam
 */
@Data
@NoArgsConstructor
public class ResultPagingDto {
    private int totalPage;
    private int pageSize;
    private int currentPage;



}
