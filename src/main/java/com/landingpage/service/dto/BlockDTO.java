package com.landingpage.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Block entity.
 */
public class BlockDTO implements Serializable {

    private Long id;

    private String name;

    private String code;

    private String urlLink;

    private Boolean active;

    private LocalDate createdOn;

    private String content;

    private Long categoryBlockId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUrlLink() {
        return urlLink;
    }

    public void setUrlLink(String urlLink) {
        this.urlLink = urlLink;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCategoryBlockId() {
        return categoryBlockId;
    }

    public void setCategoryBlockId(Long categoryBlockId) {
        this.categoryBlockId = categoryBlockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BlockDTO blockDTO = (BlockDTO) o;
        if(blockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlockDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", urlLink='" + getUrlLink() + "'" +
            ", active='" + isActive() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
