package oidc.controller;

import eu.olympus.client.interfaces.UserClient;
import eu.olympus.model.Attribute;
import eu.olympus.model.AttributeIdentityProof;
import eu.olympus.model.Operation;
import eu.olympus.model.Policy;
import eu.olympus.model.Predicate;
import eu.olympus.model.exceptions.AuthenticationFailedException;
import eu.olympus.model.exceptions.ExistingUserException;
import eu.olympus.model.exceptions.OperationFailedException;
import eu.olympus.model.exceptions.TokenGenerationException;
import eu.olympus.model.exceptions.UserCreationFailedException;
import eu.olympus.model.server.rest.IdentityProof;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import oidc.model.*;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class OidcController {

    private static final Logger logger = LoggerFactory.getLogger(OidcController.class);

    @Autowired
    UserClient userClient;

    @Autowired
    Policy policy;

    @Autowired
    Storage storage;

    // Login
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, @RequestParam String redirect_uri, @RequestParam String state, @RequestParam String nonce, HttpServletRequest request) {
        request.getSession().setAttribute("redirectUrl", redirect_uri);
        request.getSession().setAttribute("state", state);
        request.getSession().setAttribute("nonce", nonce);
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        policy.setPolicyId(nonce);
        return "/login";
    }

    @RequestMapping(value = "/loginFailed", method = RequestMethod.GET)
    public String login(Model model) {
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("loginError", true);
        return "/login";
    }

    @RequestMapping(value = "/loginPage", method = RequestMethod.GET)
    public String loginPage(Model model) {
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("hasCreated", false);
        return "/login";
    }

    @PostMapping("/authenticate")
    public RedirectView authenticate(LoginRequest loginRequest, Model model, HttpServletRequest request) throws AuthenticationFailedException, TokenGenerationException {
        try {
            policy.getPredicates().add(new Predicate("audience", Operation.REVEAL, new Attribute("olympus-service-provider")));
            System.out.println("Predicates: " + policy.getPredicates());
            String token = userClient.authenticate(loginRequest.getUsername(), loginRequest.getPassword(), policy, null, "NONE");
            model.addAttribute("username", loginRequest.getUsername());
            model.addAttribute("token", token);
            logger.info("Policy predicates: {}", policy.getPredicates());

            String redirectUrl = (String) request.getSession().getAttribute("redirectUrl");
            String state = (String) request.getSession().getAttribute("state");
            return new RedirectView(redirectUrl + "#state=" + state + "&id_token=" + token + "&token_type=bearer");
        } catch (Exception e) {
            if (ExceptionUtils.indexOfThrowable(e, AuthenticationFailedException.class) != -1) {
                return new RedirectView("/loginFailed", true);
            } else {
                throw e;
            }
        } finally {
            userClient.clearSession();
        }
    }

    // Logout

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(Model model, HttpServletRequest request) throws ServletException {
        userClient.clearSession();
        request.getSession().removeAttribute("name");
        request.getSession().removeAttribute("birthdate");
        request.getSession().setAttribute("loggedIn", false);
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("hasCreated", false);
        return "/login";
    }

    // Create User
    @RequestMapping(value = "/createUser", method = RequestMethod.GET)
    public String createNewUser(Model model) {
        model.addAttribute("userExists", false);
        CreateUserRequest createUserRequest = new CreateUserRequest();
        model.addAttribute("createUserRequest", createUserRequest);
        return "/createUser";
    }

    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public String postUser(@Valid @ModelAttribute("createUserRequest")CreateUserRequest createUserRequest, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "/createUser";
        }
        try {
            IdentityProof identityProof = constructIdentityProof(createUserRequest);
            userClient.createUserAndAddAttributes(createUserRequest.getUsername(), createUserRequest.getPassword(), identityProof);
        } catch (Exception exception) {
            if (ExceptionUtils.indexOfThrowable(exception, ExistingUserException.class) != -1) {
                model.addAttribute("userExists", true);
            } else if (ExceptionUtils.indexOfThrowable(exception, AuthenticationFailedException.class) != -1) {
                model.addAttribute("userExists", true);
            } else if (ExceptionUtils.indexOfThrowable(exception, UserCreationFailedException.class) != -1) {
                model.addAttribute("userExists", true);
            } else {
                model.addAttribute("unknownError", true);
            }
            logger.warn("Create user failed: " + exception);
            return "/createUser";
        }
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("hasCreated", true);
        userClient.clearSession();
        return "/login";
    }

    private AttributeIdentityProof constructIdentityProof(CreateUserRequest createUserRequest) {
        Map<String, Attribute> attributes = new HashMap<>();
        attributes.put("name", new Attribute(createUserRequest.getFirstName() + " " + createUserRequest.getLastName()));
        attributes.put("birthdate", new Attribute(createUserRequest.getBirthdate()));
       //applicationcategory for policy because openid
        attributes.put("family_name", new Attribute(createUserRequest.getFamily_name()));
       //studentid for policy because openid
        attributes.put("nickname", new Attribute(createUserRequest.getNickname()));
       //university for policy because openid
        attributes.put("middle_name", new Attribute(createUserRequest.getMiddle_name()));
       //awardeddegree for policy because openid
        attributes.put("given_name", new Attribute(createUserRequest.getGiven_name()));

        return new AttributeIdentityProof(attributes);
    }

    @GetMapping("/form")
    public String displayData(Model model, HttpSession session) {
        // Retrieve the applicationForm object from the session

        New_application applicationForm = (New_application) session.getAttribute("applicationForm");
        session.setAttribute("applicationForm", applicationForm);

        if (applicationForm != null) {
            // Set the applicationForm object in the model

            model.addAttribute("applicationForm", applicationForm);
            model.addAttribute("applicationEntry", applicationForm.getApplicationentry());
            model.addAttribute("academicProgramme", applicationForm.getAcademicprogramme());
            model.addAttribute("modeStudy", applicationForm.getModestudy());
            model.addAttribute("proposedTopic", applicationForm.getProposedtopic());
            model.addAttribute("proposedsupervisor", applicationForm.getProposedsupervisor());
            model.addAttribute("proposedgroup", applicationForm.getProposedgroup());
            model.addAttribute("firstname", applicationForm.getFirstname());
            model.addAttribute("lastname", applicationForm.getLastname());
            model.addAttribute("gender", applicationForm.getGender());
            model.addAttribute("email", applicationForm.getEmail());
            model.addAttribute("address1", applicationForm.getAddress1());
            model.addAttribute("address2", applicationForm.getAddress2());
            model.addAttribute("city", applicationForm.getCity());
            model.addAttribute("country", applicationForm.getCountry());
            model.addAttribute("postalcode", applicationForm.getPostalcode());
            model.addAttribute("departmentname", applicationForm.getDepartmentname());
            model.addAttribute("universityname", applicationForm.getUniversityname());
            model.addAttribute("organizationcountry", applicationForm.getOrganizationcountry());
            model.addAttribute("additionalinstitutions", applicationForm.getAdditionalinstitutions());
            model.addAttribute("schoolname", applicationForm.getSchoolname());
            model.addAttribute("schoolCountry", applicationForm.getSchoolCountry());

            System.out.println(applicationForm.getApplicationentry());
            System.out.println(applicationForm.getAcademicprogramme());
        } else {
            // Handle the case where applicationForm is not found in the session
            // You can redirect to an error page or take appropriate action
            return "redirect:/error"; // Replace with your actual error page URL
        }

        // Return the Thymeleaf template for displaying the data
        return "form"; // This corresponds to the template name without the ".html" extension
    }


    @RequestMapping("/changePassword")
    public String changePassword(Model model) {
        ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
        model.addAttribute("changePasswordRequest", changePasswordRequest);
        return "/changePassword";
    }


    @PostMapping("/changePassword")
    public String postChangePassword(@Valid ChangePasswordRequest changePasswordRequest, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "/changePassword";
        }
        try {
            userClient.changePassword(changePasswordRequest.getUsername(), changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword(), null, "NONE");
        } catch (Exception exception) {
            if (ExceptionUtils.indexOfThrowable(exception, UserCreationFailedException.class) != -1) {
                model.addAttribute("passwordChangeError", true);
            } else if (ExceptionUtils.indexOfThrowable(exception, AuthenticationFailedException.class) != -1) {
                model.addAttribute("usernameWrongError", true);
            } else {
                model.addAttribute("unknownError", true);
            }
            return "/changePassword";
        }
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("hasChangedPassword", true);
        userClient.clearSession();
        return "/login";
    }


    @RequestMapping("/deleteAccount")
    public String deleteAccount(Model model) {
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        return "/deleteAccount";
    }


    @PostMapping("/deleteAccount")
    public String postDeleteAccount(LoginRequest loginRequest, Model model) {
        try {
            userClient.deleteAccount(loginRequest.getUsername(), loginRequest.getPassword(), null, "NONE");
        } catch (Exception exception) {
            if (ExceptionUtils.indexOfThrowable(exception, AuthenticationFailedException.class) != -1) {
                model.addAttribute("userDeletionError", true);
            } else {
                model.addAttribute("unknownError", true);
            }
            return "/deleteAccount";
        }
        loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("hasDeletedAccount", true);
        return "/login";
    }


    private String getFrontpage(Model model) {

        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);

        return "/login";
    }

    @GetMapping("/verify")
    public String verify(Model model, HttpServletRequest request) {
//        if (request.getSession().getAttribute("loggedIn") == null || !(boolean) request.getSession().getAttribute("loggedIn")) {
//            return getFrontpage(model);
//        }


        model.addAttribute("username", request.getSession().getAttribute("username"));
        model.addAttribute("policy", request.getSession().getAttribute("policy"));
//        model.addAttribute("country", request.getSession().getAttribute("country"));
//        model.addAttribute("departmentname", request.getSession().getAttribute("departmentname"));
//        model.addAttribute("universityname", request.getSession().getAttribute("universityname"));
//        model.addAttribute("organizationcountry", request.getSession().getAttribute("organizationcountry"));
//        model.addAttribute("additionalinstitutions", request.getSession().getAttribute("additionalinstitutions"));

        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        System.out.println(request.getSession());

        return "/verify";
    }

    @GetMapping("/storage")
    public String hello(Model model, HttpServletRequest request) {
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("hasCreated", false);
        return "/storage";
    }

    @PostMapping("/storage")
    public String showUserInfo(Model model, HttpServletRequest request, LoginRequest loginRequest) throws AuthenticationFailedException, OperationFailedException {
        String token = userClient.authenticate(loginRequest.getUsername(), loginRequest.getPassword(), policy, null, "NONE");
        storage.checkCredential();
        System.out.println(storage.checkCredential());

        model.addAttribute("username", loginRequest.getUsername());
        model.addAttribute("token", token);
        model.addAttribute("firstname", request.getSession().getAttribute("firstname"));
        model.addAttribute("studentid", request.getSession().getAttribute("studentid"));
        model.addAttribute("university", request.getSession().getAttribute("university"));
        model.addAttribute("awardeddegree", request.getSession().getAttribute("awardeddegree"));
        model.addAttribute("loginRequest", loginRequest);

        return "storage";
    }


    public class SpringFileUploadController {

        @GetMapping("/index")
        public String hello() {
            return "applicationform";
        }

        @PostMapping("/upload")
        public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {

            String fileName = file.getOriginalFilename();
            try {
                file.transferTo(new File("C:\\upload\\" + fileName));

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
            return ResponseEntity.ok("File uploaded successfully.");
        }


    }

    @RequestMapping("manageAccountLogin")
    public String manageAccountLogin(Model model) {
        LoginRequest loginRequest = new LoginRequest();
        model.addAttribute("loginRequest", loginRequest);
        return "/manageAccountLogin";
    }



// msc form

    @RequestMapping(value = "/applicationform", method = RequestMethod.GET)
    public String showApplicationForm(Model model, HttpSession session) {
        // Retrieve the ApplicationForm object from the session, if it exists
        New_application applicationForm = (New_application) session.getAttribute("applicationForm");

        if (applicationForm == null) {
            applicationForm = new New_application();
            // Populate the fields with data using setter methods
            applicationForm.setApplicationcategory("");
            applicationForm.setApplicationentry("");
            applicationForm.setAcademicprogramme("");
            applicationForm.setModestudy("");
            applicationForm.setProposedtopic("");
            applicationForm.setProposedsupervisor("");
            applicationForm.setProposedgroup("");
            applicationForm.setFirstname("");
            applicationForm.setLastname("");
            applicationForm.setGender("");
            applicationForm.setEmail("");
            applicationForm.setAddress1("");
            applicationForm.setAddress2("");
            applicationForm.setCity("");
            applicationForm.setCountry("");
            applicationForm.setPostalcode("");
            applicationForm.setDepartmentname("");
            applicationForm.setUniversityname("");
            applicationForm.setOrganizationcountry("");
            applicationForm.setAdditionalinstitutions("");
            applicationForm.setSchoolname("");
            applicationForm.setSchoolCountry("");

            session.setAttribute("applicationForm", applicationForm);
        }
        System.out.println(applicationForm);
        // Set the applicationForm object as an attribute in the model
        model.addAttribute("applicationForm", applicationForm);
        model.addAttribute("applicationEntry", applicationForm.getApplicationentry());
        model.addAttribute("academicProgramme", applicationForm.getAcademicprogramme());
        model.addAttribute("modeStudy", applicationForm.getModestudy());
        model.addAttribute("proposedTopic", applicationForm.getProposedtopic());
        model.addAttribute("proposedsupervisor", applicationForm.getProposedsupervisor());
        model.addAttribute("proposedgroup", applicationForm.getProposedgroup());
        model.addAttribute("firstname", applicationForm.getFirstname());
        model.addAttribute("lastname", applicationForm.getLastname());
        model.addAttribute("gender", applicationForm.getGender());
        model.addAttribute("email", applicationForm.getEmail());
        model.addAttribute("address1", applicationForm.getAddress1());
        model.addAttribute("address2", applicationForm.getAddress2());
        model.addAttribute("city", applicationForm.getCity());
        model.addAttribute("country", applicationForm.getCountry());
        model.addAttribute("postalcode", applicationForm.getPostalcode());
        model.addAttribute("departmentname", applicationForm.getDepartmentname());
        model.addAttribute("universityname", applicationForm.getUniversityname());
        model.addAttribute("organizationcountry", applicationForm.getOrganizationcountry());
        model.addAttribute("additionalinstitutions", applicationForm.getAdditionalinstitutions());
        model.addAttribute("schoolname", applicationForm.getSchoolname());
        model.addAttribute("schoolCountry", applicationForm.getSchoolCountry());

        // You can set more attributes as needed for the view
        session.setAttribute("applicationForm", applicationForm);

        // Then, return the view name
        return "applicationform"; // Replace with your actual view name
    }

    @PostMapping("/applicationform")
    public String submitApplicationForm(New_application applicationForm, HttpSession session) {
        // Handle form submission here

        // You can access form data via the applicationForm parameter
        // For example, applicationForm.getApplicationcategory(), applicationForm.getFirstname(), etc.
        applicationForm.getApplicationcategory();
        applicationForm.getFirstname();
        applicationForm.getApplicationentry();
        applicationForm.getAcademicprogramme();
        applicationForm.getModestudy();
        applicationForm.getProposedtopic();
        applicationForm.getProposedsupervisor();
        applicationForm.getProposedgroup();
        applicationForm.getFirstname();
        applicationForm.getLastname();
        applicationForm.getGender();
        applicationForm.getEmail();
        applicationForm.getAddress1();
        applicationForm.getAddress2();
        applicationForm.getCity();
        applicationForm.getCountry();
        applicationForm.getPostalcode();
        applicationForm.getDepartmentname();
        applicationForm.getUniversityname();
        applicationForm.getOrganizationcountry();
        applicationForm.getAdditionalinstitutions();
        applicationForm.getSchoolname();
        applicationForm.getSchoolCountry();
        // Store the updated applicationForm object in the session
        session.setAttribute("applicationForm", applicationForm);
        System.out.println(applicationForm);
        // Redirect to a success page or perform other actions as needed
        return "redirect:/form"; // Replace with the actual success page URL

    }

    //for msc
    @RequestMapping("/form1")
    public String ApplicationFormmsc(Model model, HttpSession session) {
        // Retrieve the applicationForm object from the session
        New_application applicationForm = (New_application) session.getAttribute("applicationForm");

        if (applicationForm != null) {
            // Set the applicationForm object in the model
            model.addAttribute("applicationForm", applicationForm);
            model.addAttribute("applicationEntry", applicationForm.getApplicationentry());
            model.addAttribute("academicProgramme", applicationForm.getAcademicprogramme());
            model.addAttribute("modeStudy", applicationForm.getModestudy());
            model.addAttribute("proposedTopic", applicationForm.getProposedtopic());
            model.addAttribute("proposedsupervisor", applicationForm.getProposedsupervisor());
            model.addAttribute("proposedgroup", applicationForm.getProposedgroup());
            model.addAttribute("firstname", applicationForm.getFirstname());
            model.addAttribute("lastname", applicationForm.getLastname());
            model.addAttribute("gender", applicationForm.getGender());
            model.addAttribute("email", applicationForm.getEmail());
            model.addAttribute("address1", applicationForm.getAddress1());
            model.addAttribute("address2", applicationForm.getAddress2());
            model.addAttribute("city", applicationForm.getCity());
            model.addAttribute("country", applicationForm.getCountry());
            model.addAttribute("postalcode", applicationForm.getPostalcode());
            model.addAttribute("departmentname", applicationForm.getDepartmentname());
            model.addAttribute("universityname", applicationForm.getUniversityname());
            model.addAttribute("organizationcountry", applicationForm.getOrganizationcountry());
            model.addAttribute("additionalinstitutions", applicationForm.getAdditionalinstitutions());
            model.addAttribute("schoolname", applicationForm.getSchoolname());
            model.addAttribute("schoolCountry", applicationForm.getSchoolCountry());

            // Debugging: Print some values to console
            System.out.println("applicationEntry: " + applicationForm.getApplicationentry());
            System.out.println("academicProgramme: " + applicationForm.getAcademicprogramme());
            // Add more println statements for other fields as needed

            return "form1"; // This corresponds to the template name without the ".html" extension
        } else {
            // Handle the case where applicationForm is not found in the session
            // You can redirect to an error page or take appropriate action
            return "redirect:http://localhost:10000/404"; // Replace with your actual error page URL
        }
    }

    @RequestMapping("/reviewm")
    public String ApplicationFormmscreview(Model model, HttpSession session) {
        // Retrieve the applicationForm object from the session
        New_application applicationForm = (New_application) session.getAttribute("applicationForm");

        if (applicationForm != null) {
            // Set the applicationForm object in the model
            model.addAttribute("applicationForm", applicationForm);
            model.addAttribute("applicationEntry", applicationForm.getApplicationentry());
            model.addAttribute("academicProgramme", applicationForm.getAcademicprogramme());
            model.addAttribute("modeStudy", applicationForm.getModestudy());
            model.addAttribute("proposedTopic", applicationForm.getProposedtopic());
            model.addAttribute("proposedsupervisor", applicationForm.getProposedsupervisor());
            model.addAttribute("proposedgroup", applicationForm.getProposedgroup());
            model.addAttribute("firstname", applicationForm.getFirstname());
            model.addAttribute("lastname", applicationForm.getLastname());
            model.addAttribute("gender", applicationForm.getGender());
            model.addAttribute("email", applicationForm.getEmail());
            model.addAttribute("address1", applicationForm.getAddress1());
            model.addAttribute("address2", applicationForm.getAddress2());
            model.addAttribute("city", applicationForm.getCity());
            model.addAttribute("country", applicationForm.getCountry());
            model.addAttribute("postalcode", applicationForm.getPostalcode());
            model.addAttribute("departmentname", applicationForm.getDepartmentname());
            model.addAttribute("universityname", applicationForm.getUniversityname());
            model.addAttribute("organizationcountry", applicationForm.getOrganizationcountry());
            model.addAttribute("additionalinstitutions", applicationForm.getAdditionalinstitutions());
            model.addAttribute("schoolname", applicationForm.getSchoolname());
            model.addAttribute("schoolCountry", applicationForm.getSchoolCountry());

            // Debugging: Print some values to console
            System.out.println("applicationEntry: " + applicationForm.getApplicationentry());
            System.out.println("academicProgramme: " + applicationForm.getAcademicprogramme());
            // Add more println statements for other fields as needed

            return "reviewm"; // This corresponds to the template name without the ".html" extension
        } else {
            // Handle the case where applicationForm is not found in the session
            // You can redirect to an error page or take appropriate action
            return "redirect:http://localhost:10000/404"; // Replace with your actual error page URL
        }
    }

    //php form
    @RequestMapping(value = "/phdapplication", method = RequestMethod.GET)
    public String showApplicationFormPhD(Model model, HttpSession session) {
        // Retrieve the ApplicationForm object from the session, if it exists
        Php_application phdapplication = (Php_application) session.getAttribute("phdapplication");

        if (phdapplication == null) {
            phdapplication = new Php_application();
            // Populate the fields with data using setter methods
            phdapplication.setApplicationcategory("");
            phdapplication.setApplicationentry("");
            phdapplication.setAcademicprogramme("");
            phdapplication.setModestudy("");
            phdapplication.setProposedtopic("");
            phdapplication.setProposedsupervisor("");
            phdapplication.setProposedgroup("");
            phdapplication.setFirstname("");
            phdapplication.setLastname("");
            phdapplication.setGender("");
            phdapplication.setEmail("");
            phdapplication.setAddress1("");
            phdapplication.setAddress2("");
            phdapplication.setCity("");
            phdapplication.setCountry("");
            phdapplication.setPostalcode("");
            phdapplication.setDepartmentname("");
            phdapplication.setUniversityname("");
            phdapplication.setOrganizationcountry("");
            phdapplication.setAdditionalinstitutions("");
            phdapplication.setSchoolname("");
            phdapplication.setSchoolCountry("");

            session.setAttribute("phdapplication", phdapplication);
        }
        System.out.println(phdapplication);
        // Set the applicationForm object as an attribute in the model
        model.addAttribute("applicationForm1", phdapplication);
        model.addAttribute("applicationcategory", phdapplication.getApplicationcategory());
        model.addAttribute("applicationEntry", phdapplication.getApplicationentry());
        model.addAttribute("academicProgramme", phdapplication.getAcademicprogramme());
        model.addAttribute("modeStudy", phdapplication.getModestudy());
        model.addAttribute("proposedTopic", phdapplication.getProposedtopic());
        model.addAttribute("proposedsupervisor", phdapplication.getProposedsupervisor());
        model.addAttribute("proposedgroup", phdapplication.getProposedgroup());
        model.addAttribute("firstname", phdapplication.getFirstname());
        model.addAttribute("lastname", phdapplication.getLastname());
        model.addAttribute("gender", phdapplication.getGender());
        model.addAttribute("email", phdapplication.getEmail());
        model.addAttribute("address1", phdapplication.getAddress1());
        model.addAttribute("address2", phdapplication.getAddress2());
        model.addAttribute("city", phdapplication.getCity());
        model.addAttribute("country", phdapplication.getCountry());
        model.addAttribute("postalcode", phdapplication.getPostalcode());
        model.addAttribute("departmentname", phdapplication.getDepartmentname());
        model.addAttribute("universityname", phdapplication.getUniversityname());
        model.addAttribute("organizationcountry", phdapplication.getOrganizationcountry());
        model.addAttribute("additionalinstitutions", phdapplication.getAdditionalinstitutions());
        model.addAttribute("schoolname", phdapplication.getSchoolname());
        model.addAttribute("schoolCountry", phdapplication.getSchoolCountry());

        // You can set more attributes as needed for the view
        session.setAttribute("phdapplication", phdapplication);

        // Then, return the view name
        return "phdapplication"; // Replace with your actual view name
    }

    @PostMapping("/phdapplication")
    public String submitApplicationFormPhD(Php_application phdapplication, HttpSession session) {
        // Handle form submission here

        // You can access form data via the applicationForm parameter
        // For example, applicationForm.getApplicationcategory(), applicationForm.getFirstname(), etc.
        phdapplication.getApplicationcategory();
        phdapplication.getFirstname();
        phdapplication.getApplicationentry();
        phdapplication.getAcademicprogramme();
        phdapplication.getModestudy();
        phdapplication.getProposedtopic();
        phdapplication.getProposedsupervisor();
        phdapplication.getProposedgroup();
        phdapplication.getFirstname();
        phdapplication.getLastname();
        phdapplication.getGender();
        phdapplication.getEmail();
        phdapplication.getAddress1();
        phdapplication.getAddress2();
        phdapplication.getCity();
        phdapplication.getCountry();
        phdapplication.getPostalcode();
        phdapplication.getDepartmentname();
        phdapplication.getUniversityname();
        phdapplication.getOrganizationcountry();
        phdapplication.getAdditionalinstitutions();
        phdapplication.getSchoolname();
        phdapplication.getSchoolCountry();
        // Store the updated applicationForm object in the session
        session.setAttribute("phdapplication", phdapplication);
        System.out.println(phdapplication);
        // Redirect to a success page or perform other actions as needed
        return "redirect:/formpar"; // Replace with the actual success page URL
    }

    @GetMapping("/formpar")
    public String displayDataphd(Model model, HttpSession session) {
        // Retrieve the applicationForm object from the session

        Php_application phdapplication = (Php_application) session.getAttribute("phdapplication");
        session.setAttribute("phdapplication", phdapplication);

        if (phdapplication != null) {
            // Set the applicationForm object in the model

            model.addAttribute("applicationForm1", phdapplication);
            model.addAttribute("applicationEntry", phdapplication.getApplicationentry());
            model.addAttribute("academicProgramme", phdapplication.getAcademicprogramme());
            model.addAttribute("modeStudy", phdapplication.getModestudy());
            model.addAttribute("proposedTopic", phdapplication.getProposedtopic());
            model.addAttribute("proposedsupervisor", phdapplication.getProposedsupervisor());
            model.addAttribute("proposedgroup", phdapplication.getProposedgroup());
            model.addAttribute("firstname", phdapplication.getFirstname());
            model.addAttribute("lastname", phdapplication.getLastname());
            model.addAttribute("gender", phdapplication.getGender());
            model.addAttribute("email", phdapplication.getEmail());
            model.addAttribute("address1", phdapplication.getAddress1());
            model.addAttribute("address2", phdapplication.getAddress2());
            model.addAttribute("city", phdapplication.getCity());
            model.addAttribute("country", phdapplication.getCountry());
            model.addAttribute("postalcode", phdapplication.getPostalcode());
            model.addAttribute("departmentname", phdapplication.getDepartmentname());
            model.addAttribute("universityname", phdapplication.getUniversityname());
            model.addAttribute("organizationcountry", phdapplication.getOrganizationcountry());
            model.addAttribute("additionalinstitutions", phdapplication.getAdditionalinstitutions());
            model.addAttribute("schoolname", phdapplication.getSchoolname());
            model.addAttribute("schoolCountry", phdapplication.getSchoolCountry());

            System.out.println(phdapplication.getApplicationentry());
            System.out.println(phdapplication.getAcademicprogramme());
        } else {
            // Handle the case where applicationForm is not found in the session
            // You can redirect to an error page or take appropriate action
            return "redirect:http://localhost:10000/404"; // Replace with your actual error page URL
        }

        // Return the Thymeleaf template for displaying the data
        return "formpar"; // This corresponds to the template name without the ".html" extension
    }

    // form phd
    @RequestMapping("/form2")
    public String displayDataphd1(Model model, HttpSession session) {
        // Retrieve the applicationForm object from the session
        Php_application phdapplication = (Php_application) session.getAttribute("phdapplication");

        if (phdapplication != null) {
            // Set the applicationForm object in the model
            model.addAttribute("applicationForm1", phdapplication);
            model.addAttribute("applicationEntry", phdapplication.getApplicationentry());
            model.addAttribute("academicProgramme", phdapplication.getAcademicprogramme());
            model.addAttribute("modeStudy", phdapplication.getModestudy());
            model.addAttribute("proposedTopic", phdapplication.getProposedtopic());
            model.addAttribute("proposedsupervisor", phdapplication.getProposedsupervisor());
            model.addAttribute("proposedgroup", phdapplication.getProposedgroup());
            model.addAttribute("firstname", phdapplication.getFirstname());
            model.addAttribute("lastname", phdapplication.getLastname());
            model.addAttribute("gender", phdapplication.getGender());
            model.addAttribute("email", phdapplication.getEmail());
            model.addAttribute("address1", phdapplication.getAddress1());
            model.addAttribute("address2", phdapplication.getAddress2());
            model.addAttribute("city", phdapplication.getCity());
            model.addAttribute("country", phdapplication.getCountry());
            model.addAttribute("postalcode", phdapplication.getPostalcode());
            model.addAttribute("departmentname", phdapplication.getDepartmentname());
            model.addAttribute("universityname", phdapplication.getUniversityname());
            model.addAttribute("organizationcountry", phdapplication.getOrganizationcountry());
            model.addAttribute("additionalinstitutions", phdapplication.getAdditionalinstitutions());
            model.addAttribute("schoolname", phdapplication.getSchoolname());
            model.addAttribute("schoolCountry", phdapplication.getSchoolCountry());

            // Debugging: Print some values to console
            System.out.println("applicationEntry: " + phdapplication.getApplicationentry());
            System.out.println("academicProgramme: " + phdapplication.getAcademicprogramme());
            // Add more println statements for other fields as needed

            return "form2"; // This corresponds to the template name without the ".html" extension
        } else {
            // Handle the case where applicationForm is not found in the session
            // You can redirect to an error page or take appropriate action
            return "redirect:http://localhost:10000/404"; // Replace with your actual error page URL
        }
    }

    @GetMapping("/reviewphd")
    public String displayDataphdreview(Model model, HttpSession session) {
        // Retrieve the applicationForm object from the session

        Php_application phdapplication = (Php_application) session.getAttribute("phdapplication");
        session.setAttribute("phdapplication", phdapplication);

        if (phdapplication != null) {
            // Set the applicationForm object in the model

            model.addAttribute("applicationForm1", phdapplication);
            model.addAttribute("applicationEntry", phdapplication.getApplicationentry());
            model.addAttribute("academicProgramme", phdapplication.getAcademicprogramme());
            model.addAttribute("modeStudy", phdapplication.getModestudy());
            model.addAttribute("proposedTopic", phdapplication.getProposedtopic());
            model.addAttribute("proposedsupervisor", phdapplication.getProposedsupervisor());
            model.addAttribute("proposedgroup", phdapplication.getProposedgroup());
            model.addAttribute("firstname", phdapplication.getFirstname());
            model.addAttribute("lastname", phdapplication.getLastname());
            model.addAttribute("gender", phdapplication.getGender());
            model.addAttribute("email", phdapplication.getEmail());
            model.addAttribute("address1", phdapplication.getAddress1());
            model.addAttribute("address2", phdapplication.getAddress2());
            model.addAttribute("city", phdapplication.getCity());
            model.addAttribute("country", phdapplication.getCountry());
            model.addAttribute("postalcode", phdapplication.getPostalcode());
            model.addAttribute("departmentname", phdapplication.getDepartmentname());
            model.addAttribute("universityname", phdapplication.getUniversityname());
            model.addAttribute("organizationcountry", phdapplication.getOrganizationcountry());
            model.addAttribute("additionalinstitutions", phdapplication.getAdditionalinstitutions());
            model.addAttribute("schoolname", phdapplication.getSchoolname());
            model.addAttribute("schoolCountry", phdapplication.getSchoolCountry());

            System.out.println(phdapplication.getApplicationentry());
            System.out.println(phdapplication.getAcademicprogramme());
        } else {
            // Handle the case where applicationForm is not found in the session
            // You can redirect to an error page or take appropriate action
            return "redirect:http://localhost:10000/404"; // Replace with your actual error page URL
        }

        // Return the Thymeleaf template for displaying the data
        return "reviewphd"; // This corresponds to the template name without the ".html" extension
    }

    @RequestMapping(value = "/getpolicy", method = RequestMethod.GET)
    public String showPhpVerificationPage(Model model, HttpSession session) {
        // Retrieve the PHP application form object from the session
        Php_application phdapplication = (Php_application) session.getAttribute("phpapplication");

        // Retrieve the New application form object from the session
        New_application applicationForm = (New_application) session.getAttribute("applicationForm");

        if (phdapplication == null) {
            // PHP application form data doesn't exist, so initialize it
            phdapplication = new Php_application();
            // Initialize the PHP form fields as needed
            // Example:
            phdapplication.setApplicationentry("");
            phdapplication.setAcademicprogramme("");
            // Initialize other PHP form fields as needed

            // Store the initialized PHP form data in the session
            session.setAttribute("phpapplication", phdapplication);
        }

        if (applicationForm == null) {
            // New application form data doesn't exist, so initialize it
            applicationForm = new New_application();
            // Initialize the New application form fields as needed
            // Example:
            applicationForm.setApplicationentry("");
            applicationForm.setAcademicprogramme("");
            // Initialize other New application form fields as needed

            // Store the initialized New application form data in the session
            session.setAttribute("applicationForm", applicationForm);
        }

        // Add attributes to the model to populate both forms
        model.addAttribute("phpapplication", phdapplication);
        model.addAttribute("applicationEntry", phdapplication.getApplicationentry());
        model.addAttribute("academicProgramme", phdapplication.getAcademicprogramme());
        // Add more attributes for other PHP application form fields as needed

        // Add attributes for New application form
        model.addAttribute("newApplicationForm", applicationForm);
        model.addAttribute("newApplicationEntry", applicationForm.getApplicationentry());
        model.addAttribute("newAcademicProgramme", applicationForm.getAcademicprogramme());
        // Add more attributes for other New application form fields as needed

        // Return the PHP verification page template, which includes both forms
        return "verify"; // Replace with your actual template name
    }
    @GetMapping("/error")
    public String showErrorPage() {
        return "error"; // This corresponds to the name of your HTML file (without the extension)
    }
}