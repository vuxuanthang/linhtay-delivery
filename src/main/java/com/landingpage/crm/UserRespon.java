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
public class UserRespon {

    private String status;
    private User[] data;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public User[] getData() {
        return data;
    }

    public void setData(User[] data) {
        this.data = data;
    }
}
