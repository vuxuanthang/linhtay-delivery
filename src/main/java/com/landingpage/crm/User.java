/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.landingpage.crm;

import java.math.BigDecimal;

/**
 *
 * @author thang
 */
public class User {

    private Integer id;
    private BigDecimal thanhToan;
    private Object product;
    private BigDecimal phaiThuTamTinh;
    private Integer version;
    private Integer giaoHangSelect;
    private Integer statusSelect;
    private Integer loaiThanhToan;
    private BigDecimal tienTraShip;
    private Object partner;
    private String mauSac;
    private Integer tienShip;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getThanhToan() {
        return thanhToan;
    }

    public void setThanhToan(BigDecimal thanhToan) {
        this.thanhToan = thanhToan;
    }

    public Object getProduct() {
        return product;
    }

    public void setProduct(Object product) {
        this.product = product;
    }

    public BigDecimal getPhaiThuTamTinh() {
        return phaiThuTamTinh;
    }

    public void setPhaiThuTamTinh(BigDecimal phaiThuTamTinh) {
        this.phaiThuTamTinh = phaiThuTamTinh;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Integer getGiaoHangSelect() {
        return giaoHangSelect;
    }

    public void setGiaoHangSelect(Integer giaoHangSelect) {
        this.giaoHangSelect = giaoHangSelect;
    }

    public Integer getStatusSelect() {
        return statusSelect;
    }

    public void setStatusSelect(Integer statusSelect) {
        this.statusSelect = statusSelect;
    }

    public Integer getLoaiThanhToan() {
        return loaiThanhToan;
    }

    public void setLoaiThanhToan(Integer loaiThanhToan) {
        this.loaiThanhToan = loaiThanhToan;
    }

    public BigDecimal getTienTraShip() {
        return tienTraShip;
    }

    public void setTienTraShip(BigDecimal tienTraShip) {
        this.tienTraShip = tienTraShip;
    }

    public Object getPartner() {
        return partner;
    }

    public void setPartner(Object partner) {
        this.partner = partner;
    }

    public String getMauSac() {
        return mauSac;
    }

    public void setMauSac(String mauSac) {
        this.mauSac = mauSac;
    }

    public Integer getTienShip() {
        return tienShip;
    }

    public void setTienShip(Integer tienShip) {
        this.tienShip = tienShip;
    }

}
