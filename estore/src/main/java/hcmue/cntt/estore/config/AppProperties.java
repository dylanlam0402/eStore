/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("app")
@Component
@Data
public class AppProperties {
    private String version;
    private String mailSender;
    private String fileStorage;
    private AsyncInfo asyncInfo;
    private ApiInfo apiInfo;
    private JwtConfig jwtConfig;

    @Data
    public static class AsyncInfo {
        private int corePoolSize;
        private int maxPoolSize;
        private int queueCapacity;
    }

    @Data
    public static class ApiInfo {
        private String title;
        private String description;
        private String version;
        private String contactName;
        private String contactEmail;
        private String contactUrl;
        private String license;
    }

    @Data
    public static class JwtConfig {
        private String headerName;
        private int expiresIn;
        private int remembermeIn;
        private String secretKey;
        private String cookieName;
    }
}
