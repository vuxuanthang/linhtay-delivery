/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.landingpage.crm;


import feign.gson.GsonDecoder;

/**
 *
 * @author thang
 */
public class ResultRespon extends GsonDecoder {
        private String status;
        private Object data;
        private String offset;
        private String total;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getOffset() {
            return offset;
        }

        public void setOffset(String offset) {
            this.offset = offset;
        }

        public String getTotal() {
            return total;
        }

        public void setTotal(String total) {
            this.total = total;
        }

        public Object getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }
}
