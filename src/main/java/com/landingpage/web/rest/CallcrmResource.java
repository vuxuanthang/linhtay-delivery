package com.landingpage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landingpage.crm.StockMoveLine;
import com.landingpage.crm.User;
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
    @GetMapping("logout")
    public String logout(HttpServletRequest request) {
        CrmService crmService = new CrmService();
        String result = crmService.logout();
        return result;
    }

    /**
     *
     */
    @PostMapping("/test")
    public String getTest( HttpServletRequest request) {
        HttpSession session = request.getSession();
        Enumeration<String> names = request.getHeaderNames();
        String result = "400";
        CrmService crmService = new CrmService();
        if( crmService.checkAuthen(request.getHeaders("Cookie")) ){
            //result =  crmService.getStockMoveLineDetail(12504);
        }
        return result;
    }

    /**
     *
     */
    @PostMapping("/getStockMoveLineDetail")
    public StockMoveLine getStockMoveLineDetail(HttpServletRequest request, @RequestBody Integer id) {
        CrmService crmService = new CrmService();
        StockMoveLine result = new StockMoveLine();
        if( crmService.checkAuthen(request.getHeaders("Cookie")) ){
            result =  crmService.getStockMoveLineDetail(id);
        }
        return result;
    }

    /**
     *
     */
    @PostMapping("/getStockMoveLineDetail")
    public User getUser(HttpServletRequest request, @RequestBody Integer id) {
        CrmService crmService = new CrmService();
        User result = new User();
        if( crmService.checkAuthen(request.getHeaders("Cookie")) ){
            result =  crmService.getUser(id);
        }
        return result;
    }


}
