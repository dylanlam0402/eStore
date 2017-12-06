/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.domain.common;

import hcmue.cntt.estore.config.AppProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;


import javax.mail.internet.MimeMessage;
import java.util.concurrent.Future;

@Service
@Slf4j
public class MailingService {
    private final JavaMailSender mailSender;
    private final AppProperties appProperties;

    public MailingService(JavaMailSender mailSender, AppProperties appProperties) {
        this.mailSender = mailSender;
        this.appProperties = appProperties;
    }

    @Async
    public Future<Boolean> sendEmailAsync(String subject, String content, String... to) {
        // Prepare message using a Spring helper
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        boolean result;
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, false, "utf-8");
            message.setFrom(appProperties.getMailSender());
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content, true);
            mailSender.send(mimeMessage);
            result = true;
        } catch (Exception ex) {
            result = false;
            log.error("E-mail could not be sent to user " + to, ex);
        }

        return new AsyncResult<>(result);
    }
}
