package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.Observation;

import java.util.ArrayList;

public class ObservationDto extends ResourceDto {

    private String value;
    private String valueCode;
    private String description;
    private String date;

    public ObservationDto(Observation resource) {
        super(resource);
        setValue(String.valueOf(resource.getValueQuantity().getValue()));
        setValueCode(String.valueOf(resource.getValueQuantity().getCode()));
        setDescription(resource.getCode().getText());
        date = resource.getEffectiveDateTimeType().toHumanDisplay();

    }

    public ArrayList<String> getObservationFullData() {
        ArrayList<String> observationFullData = new ArrayList<>();
        observationFullData.add(super.getId());
        observationFullData.add(value);
        observationFullData.add(valueCode);
        observationFullData.add(description);
        observationFullData.add(date);
        return observationFullData;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getValueCode() {
        return valueCode;
    }

    public void setValueCode(String valueCode) {
        this.valueCode = valueCode;
    }
}
