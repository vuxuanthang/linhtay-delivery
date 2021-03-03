/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.landingpage.crm;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thang
 */
public class CrmParameter {
    private final String url = "https://linhtay.com";
    private final String user = "admin";
    private final String password = "fis@123";
    private final String dataModelPartner = "com.axelor.apps.base.db.Partner";
    private final String urlCreatePartner = url + "/ws/rest/" + dataModelPartner;
    
    private final String dataModelLead = "com.axelor.apps.crm.db.Lead";
    private final String urlCreateLead = url + "/ws/rest/" + dataModelLead;
    
    public String getUrl() {
        return url;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

    public String getDataModelPartner() {
        return dataModelPartner;
    }

    public String getUrlCreatePartner() {
        return urlCreatePartner;
    }

    public String getDataModelLead() {
        return dataModelLead;
    }

    public String getUrlCreateLead() {
        return urlCreateLead;
    }

   
    
    
    
}
