package hcmue.cntt.estore.infras.repository.converter;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {
    private static final String ITEM_DELIMITER = ",";

    @Override
    public String convertToDatabaseColumn(List<String> items) {
        if (CollectionUtils.isEmpty(items)) {
            return "";
        }

        return String.join(ITEM_DELIMITER, items);
    }

    @Override
    public List<String> convertToEntityAttribute(String joinedItems) {
        if (StringUtils.isEmpty(joinedItems)) {
            return Collections.emptyList();
        }

        return Arrays.asList(joinedItems.split(ITEM_DELIMITER));
    }
}
