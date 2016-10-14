/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ims.imsweb;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.ims.dao.entity.ImsAppsettings;
import org.ims.transactionEngine.model.LoginModel;
import org.ims.transactionEngine.securityManager.Appsettings;
import org.ims.transactionEngine.securityManager.Loginservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * @author suri
 */
@EnableWebMvc
@RestController
public class ImsSecurityService {

    @Autowired
    private Loginservice loginservice;
    @Autowired
    private Appsettings appSettings;

    static Logger log = Logger.getLogger(ImsSecurityService.class.getName());

    @RequestMapping(value = "/initialize", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<ImsAppsettings>> getAppSettings() {
        List<ImsAppsettings> appsetting = appSettings.getAllAppSettings();
        if (!appsetting.isEmpty()) {
            log.info("Getting App settings");
            return new ResponseEntity<>(appsetting, HttpStatus.OK);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/validatelogin", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<LoginModel> processLogin(HttpServletRequest request, HttpServletResponse response, @RequestBody String Param) {

        LoginModel Userlogin = new LoginModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession(true);
        try {
//        objm.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Userlogin = objm.readValue(Param, LoginModel.class);
            if (loginservice.isUserExisits(Userlogin.getUserName(), Userlogin.getPassword())) {
                hs.setAttribute("UserName", Userlogin.getUserName());
                hs.setAttribute("token", hs.getId());
                hs.setMaxInactiveInterval(500);
                Userlogin.setToken(hs.getId());
                Userlogin.setLoginparam("home");

            }
        } catch (Exception e) {
            log.error("processLogin(HttpServletRequest request, HttpServletResponse response, @RequestBody String Param)  :" + e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Userlogin, HttpStatus.OK);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<LoginModel> processLogout(HttpServletRequest request, HttpServletResponse response) {

        LoginModel Userlogin = new LoginModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {

            if (hs != null) {
                log.info("Loggin Out :" + hs.getAttribute("UserName"));
                hs.invalidate();
            }

        } catch (Exception ex) {
            log.error("processLogout(HttpServletRequest request, HttpServletResponse response, @RequestBody String Param) :" + ex);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(Userlogin, HttpStatus.OK);
    }
//    @RequestMapping(value="/home",method=RequestMethod.GET)
//    public ModelAndView displayHome(HttpServletRequest request,HttpServletResponse response){
//        
//        if (request.getSession().getId()==null){
//            return new ModelAndView("index");
//        }
//        return new ModelAndView("home");
//    }
//    @RequestMapping(value="/logout",method=RequestMethod.GET)
//    public ModelAndView logout(HttpServletRequest request,HttpServletResponse response){
//        
//        if (request.getSession().getId()!=null){
//            request.getSession().invalidate();
//            return new ModelAndView("index");
//        }
//        return new ModelAndView("index");
//    }

}
