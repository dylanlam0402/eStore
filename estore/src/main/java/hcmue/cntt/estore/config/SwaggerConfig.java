/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */
package hcmue.cntt.estore.config;

import com.fasterxml.classmate.TypeResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.context.request.async.DeferredResult;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.schema.WildcardType;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Configuration
@EnableSwagger2
@Profile("!utest")
public class SwaggerConfig {

    private final Logger logger = LoggerFactory.getLogger(SwaggerConfig.class);

    @Value("#{appProperties.apiInfo}")
    private AppProperties.ApiInfo apiInfo;

    @Autowired
    private TypeResolver typeResolver;

    @Bean
    public Docket eStoreApi() {
        StopWatch watch = new StopWatch();
        watch.start();

        Docket docket = new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .select()
                .paths(PathSelectors.regex("/api/.*"))
                .build()
            .directModelSubstitute(LocalDate.class, String.class)
            .directModelSubstitute(ZonedDateTime.class, Date.class)
            .directModelSubstitute(LocalDateTime.class, Date.class)
            .genericModelSubstitutes(ResponseEntity.class)
            .alternateTypeRules(
                AlternateTypeRules.newRule(
                    typeResolver.resolve(DeferredResult.class,
                    typeResolver.resolve(ResponseEntity.class, WildcardType.class)),
                    typeResolver.resolve(WildcardType.class)))
            .useDefaultResponseMessages(false)
            .securitySchemes(Collections.singletonList(new ApiKey("eStore", "Authorization", "header")))
            .securityContexts(Collections.singletonList(securityContext()));

        watch.stop();
        logger.debug("Started Swagger in {} ms", watch.getTotalTimeMillis());

        return docket;
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
            .securityReferences(defaultAuth())
            .forPaths(PathSelectors.regex("/.*"))
            .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "Access everything");

        return Collections.singletonList(new SecurityReference("eStore",
            new AuthorizationScope[] { authorizationScope }));
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
            apiInfo.getTitle(),
            apiInfo.getDescription(),
            apiInfo.getVersion(),
            apiInfo.getContactUrl(),
            new Contact(apiInfo.getContactName(), apiInfo.getContactUrl(), apiInfo.getContactEmail()),
            apiInfo.getLicense(),
            apiInfo.getContactUrl(),
            Collections.emptyList());
    }

}
