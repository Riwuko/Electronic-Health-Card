package com.example.fhirproject.api;

import ca.uhn.fhir.rest.gclient.ICriterion;
import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.PatientDto;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patients")
public class PatientListApi {

    @Autowired
    DataServerDao dataServer;

    ArrayList<PatientDto> patientsList;

    @GetMapping
    public ResponseEntity<? extends Object> patientsList() {
        try{
            ArrayList<Patient> patientsResources = dataServer.getPatientsData();
            ArrayList<PatientDto> patientsList = (ArrayList<PatientDto>) patientsResources.stream()
                    .map(PatientDto::new)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(patientsList, HttpStatus.OK);

        }catch (Exception e){
            System.out.println("Error getting Patients Data");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search={familyname")
    public ResponseEntity<? extends Object> patientsListFiltered(@PathVariable("familyname") String familyName) {
        try{
            ICriterion condition = Patient.FAMILY.matches().value(familyName);
            ArrayList<Patient> patientsFilteredResources = dataServer.getPatientsFilteredData(condition);
            ArrayList<PatientDto> patientsList = (ArrayList<PatientDto>) patientsFilteredResources.stream()
                    .map(PatientDto::new)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(patientsList, HttpStatus.OK);

        }catch (Exception e){
            System.out.println("Error getting Patients Data");
            return ResponseEntity.notFound().build();
        }

    }


}