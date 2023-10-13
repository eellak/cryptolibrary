package oidc.model;


import lombok.Getter;
import lombok.Setter;

/**
 * A container for a login request
 */
@Getter
@Setter
public class ChangeMasterRequest implements MasterContainer {

    private String applicationcategory;
    private String applicationentry;
    private String academicprogramme;
    private String modestudy;
    private String proposedtopic;
    private String proposedsupervisor;
    private String proposedgroup;
    private String firstname;
    private String lastname;
    private String gender;
    private String email;
    private String address1;
    private String address2;
    private String city;
    private String country;
    private String postalcode;
    private String departmentname;
    private String universityname;
    private String organizationcountry;
    private String additionalinstitutions;
    private String schoolname;
    private String schoolCountry;

}
