package com.example.fhirproject.api;

import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.ObservationDto;
import com.example.fhirproject.dto.PatientDto;
import com.example.fhirproject.dto.ResourceDto;
import org.hl7.fhir.r4.model.MedicationRequest;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
public class PatientDetailApi {

    @Autowired
    DataServerDao dataServer;

    @GetMapping("patient/{id:.+}")
    public PatientDto getPatientDataById(@PathVariable("id") String id) {
        try {
            Patient patient = dataServer.getPatientById(id);

            ArrayList<Observation> observationsResources = dataServer.getPatientObservationData(id);
            ArrayList<ObservationDto> cbservationList = (ArrayList<ObservationDto>) observationsResources.stream()
                    .map(ObservationDto::new)
                    .collect(Collectors.toList());

            ArrayList<MedicationRequest> medicationRequestsResources = dataServer.getPatientMedicationRequest(id);
            ArrayList<ObservationDto> medicationRequestList = (ArrayList<ObservationDto>) observationsResources.stream()
                    .map(ObservationDto::new)
                    .collect(Collectors.toList());

            return ResponseEntity.created()
        } catch (Exception e) {
            System.out.println("Error getting single patient data");

        }
        return null;
    }

}
