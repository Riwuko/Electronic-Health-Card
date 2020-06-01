package com.example.fhirproject.dto;

import org.hl7.fhir.r4.model.Patient;
import java.util.ArrayList;
import java.util.Date;

public class PatientDto extends ResourceDto{

    private String name;
    private String familyName;
    private String gender;
    private Date birthDate;

    public PatientDto(Patient resource) {
        super(resource);
        name = resource
                .getNameFirstRep()
                .getGiven()
                .get(0)
                .getValue();
        familyName = resource.getNameFirstRep().getFamily();
        gender = resource.getGender().getDisplay();
        birthDate = resource.getBirthDate();
    }

    public ArrayList<String> getPatientFullData(){
        ArrayList<String> patientFullData = new ArrayList<>();
        patientFullData.add(super.getId());
        patientFullData.add(name);
        patientFullData.add(familyName);
        patientFullData.add(gender);
        patientFullData.add(birthDate.toString());
        return patientFullData;
    }

}
