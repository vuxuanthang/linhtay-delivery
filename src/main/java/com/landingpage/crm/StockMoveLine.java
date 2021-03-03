/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.landingpage.crm;

import feign.Response;
import feign.gson.GsonDecoder;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

/**
 *
 * @author thang
 */
public class StockMoveLine {

    private String status;
    private Object data;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Object getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
}
