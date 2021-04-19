/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.landingpage.crm;

/**
 *
 * @author thang
 */
public class StockMoveLineRespon {

    private String status;
    private StockMoveLine[] data;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public StockMoveLine[] getData() {
        return data;
    }

    public void setData(StockMoveLine[] data) {
        this.data = data;
    }
}
