package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.MedicationRequest;

import java.util.ArrayList;

public class MedicationRequestDto extends ResourceDto {

    private String status;
    private String description;
    private String date;
    private String requester;

    public MedicationRequestDto(MedicationRequest resource) {
        super(resource);
        setStatus(String.valueOf(resource.getStatus()));
        setDescription(resource.getMedicationCodeableConcept().getText());
        if (description==null) setDescription("No description yet");
        setDate(resource.getAuthoredOnElement().toHumanDisplay());
        setRequester(String.valueOf(resource.getRequester()));
    }

    public ArrayList<String> getMedicationRequestFullData() {
        ArrayList<String> medicationRequestFullData = new ArrayList<>();
        medicationRequestFullData.add(super.getId());
        medicationRequestFullData.add(status);
        medicationRequestFullData.add(description);
        medicationRequestFullData.add(date);
        return medicationRequestFullData;
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

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }
}
