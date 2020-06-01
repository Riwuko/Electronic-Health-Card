package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.Patient;

import java.util.ArrayList;

public class PatientFullDataDto {

    private PatientDto patientDto;
    private ArrayList<ObservationDto> observationDtoList;
    private ArrayList<MedicationRequestDto> medicationRequestDtoList;

    public PatientFullDataDto(PatientDto patientDto, ArrayList<ObservationDto> observationDtoList, ArrayList<MedicationRequestDto> medicationRequestDtoList) {
        this.patientDto = patientDto;
        this.observationDtoList = observationDtoList;
        this.medicationRequestDtoList = medicationRequestDtoList;
    }

}
