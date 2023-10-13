package oidc.model;

import lombok.Getter;

@Getter
public class Php_application {
    // Getter methods
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

    // Setter methods
    public void setApplicationcategory(String applicationcategory) {
        this.applicationcategory = applicationcategory;
    }

    public void setApplicationentry(String applicationentry) {
        this.applicationentry = applicationentry;
    }

    public void setAcademicprogramme(String academicprogramme) {
        this.academicprogramme = academicprogramme;
    }

    public void setModestudy(String modestudy) {
        this.modestudy = modestudy;
    }

    public void setProposedtopic(String proposedtopic) {
        this.proposedtopic = proposedtopic;
    }

    public void setProposedsupervisor(String proposedsupervisor) {
        this.proposedsupervisor = proposedsupervisor;
    }

    public void setProposedgroup(String proposedgroup) {
        this.proposedgroup = proposedgroup;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public void setDepartmentname(String departmentname) {
        this.departmentname = departmentname;
    }

    public void setUniversityname(String universityname) {
        this.universityname = universityname;
    }

    public void setOrganizationcountry(String organizationcountry) {
        this.organizationcountry = organizationcountry;
    }

    public void setAdditionalinstitutions(String additionalinstitutions) {
        this.additionalinstitutions = additionalinstitutions;
    }

    public void setSchoolname(String schoolname) {
        this.schoolname = schoolname;
    }

    public void setSchoolCountry(String schoolCountry) {
        this.schoolCountry = schoolCountry;
    }
}