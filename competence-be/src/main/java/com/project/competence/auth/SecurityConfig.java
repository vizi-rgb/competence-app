package com.project.competence.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final static String ROLE_USER = "USER";
    private final static String ROLE_ADMIN = "ADMIN";
    private final static String ROLE_MANAGER = "MANAGER";
    private final CorsConfigurationSource corsConfiguration;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfiguration))
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/auth/**")
                                .permitAll()
                                .requestMatchers(
                                        "/swagger-ui/**",
                                        "/swagger-ui.html/**",
                                        "/v3/api-docs/**"
                                )
                                .permitAll()

                                .requestMatchers("/employees", "/employees/search")
                                .hasRole(ROLE_USER)

                                .requestMatchers(HttpMethod.GET, "/employees/**")
                                .hasRole(ROLE_MANAGER)

                                .requestMatchers(HttpMethod.POST, "/employees/**")
                                .hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.DELETE, "/employees/**")
                                .hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.PUT, "/employees/**")
                                .hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.PATCH, "/employees/**")
                                .hasRole(ROLE_ADMIN)
                                .requestMatchers("/auth/register")
                                .hasRole(ROLE_ADMIN)

                                .anyRequest()
                                .hasRole(ROLE_USER)
                )

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        final var provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);

        return new ProviderManager(provider);
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        final var hierarchy = """
                ROLE_ADMIN > ROLE_MANAGER
                ROLE_MANAGER > ROLE_USER
                """;
        return RoleHierarchyImpl.fromHierarchy(hierarchy);
    }

    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler(RoleHierarchy roleHierarchy) {
        final var expressionHandler = new DefaultMethodSecurityExpressionHandler();
        expressionHandler.setRoleHierarchy(roleHierarchy);
        return expressionHandler;
    }
}
