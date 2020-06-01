package com.example.fhirproject.api;

import com.example.fhirproject.dao.DataServerDao;
import com.example.fhirproject.dto.PatientDto;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class PatientDetailApi {

    @Autowired
    DataServerDao dataServer;

    @GetMapping("patient/{id:.+}")
    public PatientDto getPatientDataById(@PathVariable("id") String id){
        try{
            Patient patient = dataServer.getPatientById(id);
            ArrayList<Observation> observationsResources = dataServer.getPatientObservationData(id);


        }catch (Exception e){
            System.out.println("Error getting single patient data");
            return null;
        }

}
