package com.example.fhirproject.api;

import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.MedicationRequestDto;
import com.example.fhirproject.dto.ObservationDto;
import com.example.fhirproject.dto.PatientDto;
import com.example.fhirproject.dto.PatientFullDataDto;
import org.hl7.fhir.r4.model.MedicationRequest;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
public class PatientDetailApi {

    @Autowired
    DataServerDao dataServer;

    @GetMapping("patient/{id}")
    public ResponseEntity<PatientFullDataDto> getPatientDataById(@PathVariable("id") String id) {
        try {
            Patient patient = dataServer.getPatientById(id);

            PatientDto patientDto = new PatientDto(patient);

            ArrayList<Observation> observationsResources = dataServer.getPatientObservationData(id);
            ArrayList<ObservationDto> cbservationList = (ArrayList<ObservationDto>) observationsResources.stream()
                    .map(ObservationDto::new)
                    .collect(Collectors.toList());

            ArrayList<MedicationRequest> medicationRequestsResources = dataServer.getPatientMedicationRequest(id);
            ArrayList<MedicationRequestDto> medicationRequestList = (ArrayList<MedicationRequestDto>) medicationRequestsResources.stream()
                    .map(MedicationRequestDto::new)
                    .collect(Collectors.toList());

            PatientFullDataDto patientFullData = new PatientFullDataDto(patientDto, cbservationList,medicationRequestList);
            return new ResponseEntity<>(patientFullData, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("Error getting single patient data");
        }
        return ResponseEntity.notFound().build();
    }

}
