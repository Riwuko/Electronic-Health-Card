package com.example.fhirproject.repository;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.api.EncodingEnum;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.ICriterion;
import ca.uhn.fhir.rest.gclient.IParam;
import ca.uhn.fhir.rest.gclient.IQuery;
import org.hl7.fhir.instance.model.api.IBaseBundle;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Repository
public class FHIRServer implements DataServerRepository {

    private FhirContext ctx;
    private IGenericClient client;
   @Value("${fhir.address}")
   private String serverAddress;

    @PostConstruct
    public void init() {
        this.setCtx(FhirContext.forR4());
        this.setClient(getCtx().newRestfulGenericClient(this.getServerAddress()));
        this.getClient().setEncoding(EncodingEnum.JSON);
        this.getClient().setPrettyPrint(true);
    }

    public ArrayList<Patient> getPatientsData(){
        return getResource(Patient.class, null, null);
    }

    public ArrayList<Patient> getPatientsFilteredData(ICriterion condition){ return getResource(Patient.class, condition, null); }

    public Patient getPatientById(String index){
        return client.read().resource(Patient.class).withId(index).execute();
    }

    public ArrayList<Observation> getPatientObservationData(String index){
        ICriterion condition = Observation.PATIENT.hasId(index);
        IParam param = Observation.DATE;
        return getResource(Observation.class, condition, param);
    }

    public ArrayList<MedicationRequest>getPatientMedicationRequest(String index){
        ICriterion condition = MedicationRequest.PATIENT.hasId(index);
        return getResource(MedicationRequest.class, condition, null);
    }

    private <T> ArrayList<T> getResource(Class<T> resource, ICriterion condition, IParam param){
        try {
            Bundle queryResults = executeQuery(resource,condition,param);
            ArrayList<Resource> resourcesArray = queryResults.getEntry().stream()
                    .map(Bundle.BundleEntryComponent::getResource)
                    .collect(Collectors.toCollection(ArrayList::new));
            return (ArrayList<T>) resourcesArray;
        }catch (Exception e){
            System.out.println("Exception when getting Bundle");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private <T> Bundle executeQuery(Class<T> resource, ICriterion condition, IParam param){
        IQuery <IBaseBundle> query = client
                .search()
                .forResource((Class<? extends IBaseResource>) resource);
        if(condition!=null)
            query.where(condition);
        if(param!=null)
            query.sort().descending(param);
        return (Bundle)query.execute();
    }

    public FhirContext getCtx() {
        return ctx;
    }

    public void setCtx(FhirContext ctx) {
        this.ctx = ctx;
    }

    public IGenericClient getClient() {
        return client;
    }

    public void setClient(IGenericClient client) {
        this.client = client;
    }

    public String getServerAddress() {
        return serverAddress;
    }

    public void setServerAddress(String serverAddress) {
        this.serverAddress = serverAddress;
    }
}
