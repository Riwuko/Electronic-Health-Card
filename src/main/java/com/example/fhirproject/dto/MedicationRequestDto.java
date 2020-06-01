package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.MedicationRequest;

public class MedicationRequestDto extends ResourceDto {

    private String status;
    private String description;
    private String date;

    MedicationRequestDto(MedicationRequest resource) {
        super(resource);
        setStatus(String.valueOf(resource.getStatus()));
        setDescription(resource.getMedicationCodeableConcept().getText());
        setDate(resource.getAuthoredOnElement().toHumanDisplay());
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
