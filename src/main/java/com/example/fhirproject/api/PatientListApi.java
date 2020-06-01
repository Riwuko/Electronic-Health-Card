package com.example.fhirproject.api;

import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.PatientDto;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patients")
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


}