/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.config;

import hcmue.cntt.estore.infras.security.TokenAuthenticationFilter;
import hcmue.cntt.estore.infras.security.TokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Profile("!utest")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private TokenHelper tokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("#{appProperties.jwtConfig}")
    private AppProperties.JwtConfig jwtConfig;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/api/auth/signin","/api/itemtypes/getList","/api/item/getList","/api/item/getBrands")
                .antMatchers("/api/item/search","api/files/*")
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/**/*.{js,html,css}")
            .antMatchers("/favicon.ico");
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable().cors().and()
            .headers().frameOptions().disable()
            .and()
                .exceptionHandling()
                .authenticationEntryPoint((request, response, ex) -> response.sendError(SC_UNAUTHORIZED))
            .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
               .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/v2/api-docs**", "/swagger-resources", "/swagger-resources/**/*").permitAll()
                .antMatchers("/api/auth/signin", "/api/auth/signout").permitAll()
                .antMatchers(HttpMethod.POST, "/api/users").permitAll()
                .anyRequest()
                .authenticated()
            .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout", "POST"))
                .deleteCookies(jwtConfig.getCookieName())
            .and()
                .addFilterBefore(new TokenAuthenticationFilter(tokenHelper, userDetailsService),
                    BasicAuthenticationFilter.class);
    }
}
