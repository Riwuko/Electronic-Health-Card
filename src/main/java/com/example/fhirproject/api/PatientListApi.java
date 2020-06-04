package com.example.fhirproject.api;

import ca.uhn.fhir.rest.gclient.ICriterion;
import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.PatientDto;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patients")
@CrossOrigin("*")
public class PatientListApi {

    @Autowired
    DataServerDao dataServer;

    ArrayList<PatientDto> patientsList;

    @GetMapping
    public ArrayList<PatientDto> patientsList() {
        try{
            ArrayList<Patient> patientsResources = dataServer.getPatientsData();
            ArrayList<PatientDto> patientsList = (ArrayList<PatientDto>) patientsResources.stream()
                    .map(PatientDto::new)
                    .collect(Collectors.toList());
            return patientsList;

        }catch (Exception e){
            System.out.println("Error getting Patients Data");
            return new ArrayList<>();
        }
    }

    @GetMapping("/search={familyname}")
    @CrossOrigin("*")
    public ArrayList<PatientDto>  patientsListFiltered(@PathVariable("familyname") String familyName) {
        try{
            ICriterion condition = Patient.FAMILY.matches().value(familyName);
            ArrayList<Patient> patientsFilteredResources = dataServer.getPatientsFilteredData(condition);
            ArrayList<PatientDto> patientsList = (ArrayList<PatientDto>) patientsFilteredResources.stream()
                    .map(PatientDto::new)
                    .collect(Collectors.toList());
            return patientsList;

        }catch (Exception e){
            System.out.println("Error getting Patients Data");
            return new ArrayList<>();
        }

    }


}