/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.landingpage.crm;

import feign.*;
import feign.codec.StringDecoder;
import feign.gson.GsonEncoder;
import feign.slf4j.Slf4jLogger;
import java.util.Collection;
import java.util.Map;

import io.swagger.models.auth.In;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.landingpage.crm.CrmParameter;
import com.landingpage.domain.Partner;
import com.landingpage.domain.LoginData;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import java.util.Collection;
import java.util.Map;
import java.util.Enumeration;
import java.util.Collections;

/**
 *
 * @author thang
 */
public class CrmService {
    private final CrmParameter crmServerP = new CrmParameter();
    private final Logger log = LoggerFactory.getLogger(CrmService.class);
    private  HttpSession session;
    String crmServer = crmServerP.getUrl();

    private static String cookie = "";

    // public void CrmService( HttpServletRequest request){
    //     session = request.getSession();
    // }

    public void CrmService(){

    }

    public  String getCookie() {
        if(cookie == null){
            //CrmService crmService = new CrmService();
            //crmService.login();
            //cookie = session.getAttribute('cookie');
        }
        return cookie;
    }


    public boolean checkAuthen(Enumeration<String> header){
        Collection<String> get = Collections.list(header);
        for (String string : get) {
            if (string.startsWith("JSESSIONID")) {
                cookie = string;
                return true;
            }
        }
        return false;
    }


    public String login(LoginData user) {

        CrmDecoder crmDecoder = new CrmDecoder();

        CrmServiceIntf crmServiceIntf = Feign.builder()
                .logLevel(feign.Logger.Level.FULL)
                .logger(new Slf4jLogger(this.getClass()))
                .encoder(new GsonEncoder())
                .decoder(crmDecoder)
                //.decoder(new StringDecoder())
                .target(
                        CrmServiceIntf.class,
                        crmServer
                );

        crmServiceIntf.login(user);

        Map<String, Collection<String>> headers = crmDecoder.getHeaders();

        for (Map.Entry<String, Collection<String>> entry : headers.entrySet()) {
            String key = entry.getKey();
            Collection<String> value = entry.getValue();
        }

        Collection<String> get = headers.get("set-cookie");

        for (String string : get) {
            if (string.startsWith("JSESSIONID")) {
                cookie = string;
                break;
            }
        }
        return cookie;
    }

    public void getData() {

        CrmServiceIntf crmServiceIntf = Feign.builder()
                .decoder(new StringDecoder())
                .requestInterceptor(new RequestInterceptor() {
                    @Override
                    public void apply(RequestTemplate template) {
                        template.header("Cookie", cookie);
                    }
                }
                )
                .target(
                        CrmServiceIntf.class,
                        crmServer
                );

        System.out.println(crmServiceIntf.getData("{\"fields\":[\"contactAddress\",\"emailAddress.address\",\"fixedPhone\",\"fullName\",\"partnerCategory\",\"picture\"],\"sortBy\":null,\"data\":{\"_domain\":\"self.isContact = true\",\"_domainContext\":{}},\"limit\":39,\"offset\":0}"));

    }

    public String getStockMoveLineDetail(Integer id) {
        CrmDecoder crmDecoder = new CrmDecoder();
        CrmServiceIntf crmServiceIntf = Feign.builder()
            .decoder(crmDecoder)
            .requestInterceptor(new RequestInterceptor() {
                    @Override
                    public void apply(RequestTemplate template) {
                        template.header("Cookie", cookie);
                    }
                }
            )
            .target(
                CrmServiceIntf.class,
                crmServer
            );
        StockMoveLine stockMoveLine = crmServiceIntf.getStockMoveLineDetail(id,"{\"fields\": [\"partner\",\"product\",\"mauSac\",\"phaiThuTamTinh\", \"tienShip\",\"thanhToan\", \"loaiThanhToan\" ,\"giaoHangSelect\" ,\"statusSelect\", \"tienTraShip\"], \"related\": {\"partner\": [\"mobilePhone\", \"contactAddress\"]}}");
        return stockMoveLine.getData().toString() ;
    }

    /*public String createLead(Lead lead){
        CrmServiceIntf crmServiceIntf = Feign.builder()
                .decoder(new StringDecoder())
                .requestInterceptor(new RequestInterceptor() {
                    @Override
                    public void apply(RequestTemplate template) {
                        template.header("Cookie", cookie);
                    }
                }
                )
                .target(
                        CrmServiceIntf.class,
                        crmServer
                );

        return crmServiceIntf.insertData(cookie);
    }*/

    public String createContact(String data){
        CrmServiceIntf crmServiceIntf = Feign.builder()
                .decoder(new StringDecoder())
                .requestInterceptor(new RequestInterceptor() {
                    @Override
                    public void apply(RequestTemplate template) {
                        template.header("Cookie", cookie);
                    }
                }
                )
                .target(
                        CrmServiceIntf.class,
                        crmServer
                );

        return crmServiceIntf.insertPartner(data);
    }

    public interface CrmServiceIntf {

        @RequestLine("POST /login.jsp")
        @Headers({
            "Accept: application/json"
        })
        String login(LoginData loginData);

        @RequestLine("GET /ws/rest/com.axelor.apps.base.db.Partner/search")
        @Headers({
            "Accept: application/json",
            "Content-Type: application/json"
        })
        String getData(String dat);

        @RequestLine("POST /ws/rest/com.axelor.contact.db.Contact")
        @Headers({
            "Accept: application/json",
            "Content-Type: application/json"
        })
        String insertData(String dat);

        @RequestLine("POST /ws/rest/com.axelor.apps.base.db.Partner")
        @Headers({
            "Accept: application/json",
            "Content-Type: application/json"
        })
        String insertPartner(String dat);

        @RequestLine("POST /ws/rest/com.axelor.apps.stock.db.StockMoveLine/{id}/fetch")
        @Headers({
            "Accept: application/json",
            "Content-Type: application/json"
        })
        StockMoveLine getStockMoveLineDetail(@Param("id") Integer id, String data);

    }

}
