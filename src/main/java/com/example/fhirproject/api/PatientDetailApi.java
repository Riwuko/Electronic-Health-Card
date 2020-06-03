package com.example.fhirproject.api;

import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.*;
import org.hl7.fhir.r4.model.MedicationRequest;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class PatientDetailApi {

    @Autowired
    DataServerDao dataServer;

    @GetMapping("patient/{id}")
    public ArrayList<ResourceDto> getPatientDataById(@PathVariable("id") String id) {
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

            ArrayList<ResourceDto> patientFullData = new ArrayList<>();
            patientFullData.add(patientDto);
            patientFullData.addAll(cbservationList);
            patientFullData.addAll(medicationRequestList);

            return patientFullData;

        } catch (Exception e) {
            System.out.println("Error getting single patient data");
        }
        return null;
    }

}
