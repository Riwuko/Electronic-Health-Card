package com.example.fhirproject.repository;

import ca.uhn.fhir.rest.gclient.ICriterion;
import org.hl7.fhir.r4.model.MedicationRequest;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface DataServerRepository {

    ArrayList<Patient> getPatientsData();

    ArrayList<Patient> getPatientsFilteredData(ICriterion condition);

    ArrayList<Observation> getPatientObservationData(String index);

    ArrayList<MedicationRequest> getPatientMedicationRequest(String index);

    Patient getPatientById(String id);
}
