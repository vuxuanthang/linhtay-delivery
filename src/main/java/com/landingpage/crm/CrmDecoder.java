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
public class CrmDecoder extends GsonDecoder{
    private Map<String, Collection<String>> headers;
    

    @Override
    public Object decode(Response response, java.lang.reflect.Type type) throws IOException {
        headers = response.headers();
        return super.decode(response, type); 
    }

    public Map<String, Collection<String>> getHeaders() {
        return headers;
    }
}
