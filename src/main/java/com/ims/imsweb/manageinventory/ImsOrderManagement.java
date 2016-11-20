    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ims.imsweb.manageinventory;

import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import static com.ims.imsweb.manageinventory.ImsManageInventory.log;
import java.io.IOException;
import java.text.ParseException;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.ims.transactionEngine.InventoryService.OrderManagementService;
import org.ims.transactionEngine.model.OrderManagementModel;
import org.ims.transactionEngine.securityManager.ApplicationUtil;
import org.ims.transactionEngine.securityManager.Loginservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
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
public class ImsOrderManagement {

    @Autowired
    private Loginservice loginservice;
    @Autowired
    private OrderManagementService orderservice;
    static Logger log = Logger.getLogger(ImsManageInventory.class.getName());

    @RequestMapping(value = "/takeOrder", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity takeOrder(HttpServletResponse response, HttpServletRequest request, @RequestBody String orderdetails) {
            log.info("takeOrder() --  New Order" + orderdetails);
            OrderManagementModel ordermodel = new OrderManagementModel();
        try { 

            ObjectMapper objm = new ObjectMapper();
            objm.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            HttpSession hs = request.getSession();
            ordermodel =objm.readValue(orderdetails, OrderManagementModel.class);
            ordermodel.setEnteredDate(ApplicationUtil.getDate());
            orderservice.saveOrder(ordermodel,loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()));
            return new ResponseEntity(HttpStatus.OK);
        } catch (IOException | ParseException ex) {
            java.util.logging.Logger.getLogger(ImsOrderManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ResponseEntity<>(ordermodel,HttpStatus.OK);
    }

}
