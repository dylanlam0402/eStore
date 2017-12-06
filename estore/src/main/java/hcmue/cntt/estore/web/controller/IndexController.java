package hcmue.cntt.estore.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {
    @Value("#{appProperties.version}")
    private String appVersion;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("appVersion", appVersion);
        return "index";
    }
}
