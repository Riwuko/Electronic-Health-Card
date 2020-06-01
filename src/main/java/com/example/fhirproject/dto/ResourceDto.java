package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.Resource;

public class ResourceDto {

    private String id;

    ResourceDto(Resource resource){
        setId(resource.getIdElement().getIdPart());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
