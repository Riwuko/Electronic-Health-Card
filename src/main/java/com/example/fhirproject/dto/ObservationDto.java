package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.Observation;

public class ObservationDto extends ResourceDto {

    private String code;
    private String description;
    private String comment;
    private String date;

    ObservationDto(Observation resource) {
        super(resource);
        setCode(String.valueOf(resource.getValueQuantity().getValue()));
        setDescription(resource.getCode().getText());
        date = resource.getEffectiveDateTimeType().toHumanDisplay();
        setComment("No comments");
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
