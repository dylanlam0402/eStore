package hcmue.cntt.estore.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @Author KietLam
 */
@Data
@NoArgsConstructor
public class ItemTypeKeyDto {
    @JsonProperty("id")
    List<Long> id;
}
