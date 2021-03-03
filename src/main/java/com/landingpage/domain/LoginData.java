package com.landingpage.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class LoginData implements Serializable {

    private String username;
    private String password;

    public LoginData(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public LoginData(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}