package hcmue.cntt.estore.infras.Schedule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Author KietLam
 */
@Component
public class SoldItemSumary {
    private static final Logger log = LoggerFactory.getLogger(SoldItemSumary.class);
    private static final int TWENTY_THREE_HOURS = 82800000;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    @Scheduled(fixedRate = TWENTY_THREE_HOURS)
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));

    }
}
