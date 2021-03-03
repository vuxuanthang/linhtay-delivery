package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import com.landingpage.crm.CrmService;
import com.landingpage.domain.LoginData;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.Map;
import java.util.Enumeration;

import java.util.Collections;

/**
 * REST controller for managing Slider.
 */
@RestController
@RequestMapping("/open-api")
// /api/callCrm
public class CallcrmResource {

    /**
     *
     */
    @PostMapping("/createPartner")
    //@CrossOrigin(origins = "http://crm.htsolution.com.vn:9000/vrb")
    public String createSlider(@RequestBody String data) {
        
        CrmService crmService = new CrmService();
        
        String reuslt = crmService.createContact(data);
        return reuslt;

    }

    /**
     *
     */
    @PostMapping("/login")
    //@CrossOrigin(origins = "http://crm.htsolution.com.vn:9000/vrb")
    public String login(HttpServletRequest request, @RequestBody LoginData data) {
        CrmService crmService = new CrmService();
        String result = crmService.login(data);
        return result;
    }

    /**
     *
     */
    @GetMapping("/test")
    //@CrossOrigin(origins = "http://crm.htsolution.com.vn:9000/vrb")
    public String getTest( HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println("==== ");
        Enumeration<String> names = request.getHeaderNames();
        
        CrmService crmService = new CrmService();
        if( crmService.checkAuthen(request.getHeaders("Cookie")) ){
            crmService.getData();
        }
        
        System.out.println("==== ");
        //CrmService crmService = new CrmService(request);
        String result = "400";
        // if( crmService.checkAuthen(cookie) ){
        //     result = "200";
        // }
        return result;
    }

    /**
     *
     */
    @GetMapping("/createPartner")
    public String createSliderget() {
        
        CrmService crmService = new CrmService();
        //crmService.login();
        //String reuslt = crmService.createContact(data);
        return "reuslt";
    }

    
}
