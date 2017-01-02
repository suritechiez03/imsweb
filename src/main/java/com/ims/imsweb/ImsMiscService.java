/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ims.imsweb;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.ims.dao.entity.ImsAppsettings;
import org.ims.dao.entity.ImsGenraldefinition;
import org.ims.transactionEngine.model.GeneralDefinitionModel;
import org.ims.transactionEngine.model.TaxModel;
import org.ims.transactionEngine.securityManager.MiscService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 *
 * @author Suresh Kumar V
 */
@EnableWebMvc
@RestController
public class ImsMiscService {

//    @Autowired
    private MiscService  miscService = new MiscService();

    static Logger log = Logger.getLogger(ImsMiscService.class.getName());
 
    @RequestMapping(value = "/getGeneralDefinition", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<List<GeneralDefinitionModel>> getGeneralDefinition(HttpServletRequest request, HttpServletResponse response, @RequestBody String Value) {
        try {
            GeneralDefinitionModel gendefModel=new GeneralDefinitionModel();
            ObjectMapper objm=new ObjectMapper();
            objm.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            gendefModel=objm.readValue(Value, GeneralDefinitionModel.class);
            List<GeneralDefinitionModel> gendef = miscService.getGeneralDefByValue(gendefModel.getGdAbb());
            if (!gendef.isEmpty()) {
                log.info("Getting General Definition ");
                return new ResponseEntity<>(gendef, HttpStatus.OK);//You many decide to return HttpStatus.NOT_FOUND
            }
             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            
            java.util.logging.Logger.getLogger(ImsMiscService.class.getName()).log(Level.SEVERE, null, ex);
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/getTaxSlab", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getTaxSlab(HttpServletRequest request, HttpServletResponse response) {
        try {
            
            
            List<TaxModel> taxSlab = miscService.getActiveTaxSlab();
            if (!taxSlab.isEmpty()) {
                log.info("Getting Tax slab ");
                return new ResponseEntity<>(taxSlab, HttpStatus.OK);//You many decide to return HttpStatus.NOT_FOUND
            }
             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            
            java.util.logging.Logger.getLogger(ImsMiscService.class.getName()).log(Level.SEVERE, null, ex);
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
 