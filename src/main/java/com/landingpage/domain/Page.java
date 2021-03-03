package com.landingpage.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Page.
 */
@Entity
@Table(name = "page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Page implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "url_link")
    private String urlLink;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_on")
    private LocalDate createdOn;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Page name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public Page content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrlLink() {
        return urlLink;
    }

    public Page urlLink(String urlLink) {
        this.urlLink = urlLink;
        return this;
    }

    public void setUrlLink(String urlLink) {
        this.urlLink = urlLink;
    }

    public Boolean isActive() {
        return active;
    }

    public Page active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Page createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Page page = (Page) o;
        if (page.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), page.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Page{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", urlLink='" + getUrlLink() + "'" +
            ", active='" + isActive() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            "}";
    }
}
