package com.example.fhirproject.dao;

import ca.uhn.fhir.rest.gclient.ICriterion;
import org.hl7.fhir.r4.model.MedicationRequest;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;

import java.util.ArrayList;

public interface DataServerDao {

    ArrayList<Patient> getPatientsData();

    ArrayList<Patient> getPatientsFilteredData(ICriterion condition);

    ArrayList<Observation> getPatientObservationData(String index);

    ArrayList<MedicationRequest> getPatientMedicationRequest(String index);

    Patient getPatientById(String id);
}
