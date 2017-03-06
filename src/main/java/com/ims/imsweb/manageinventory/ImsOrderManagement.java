    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ims.imsweb.manageinventory;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
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
            ordermodel.setGeneratedOrderNo(orderservice.saveOrder(ordermodel,loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString())));
            return new ResponseEntity(ordermodel,HttpStatus.OK);
        } catch (IOException | ParseException ex) {
            java.util.logging.Logger.getLogger(ImsOrderManagement.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ordermodel,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    @RequestMapping(value="/getOrderList",method=RequestMethod.GET,produces="application/json")
    public ResponseEntity getOrderList(HttpServletResponse response,HttpServletRequest request){
        try {
            log.info("getOrderList() --  Fecthing Orders");
            
            return new ResponseEntity<>(orderservice.getOrderList("ALL",""),HttpStatus.OK);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(ImsOrderManagement.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    @RequestMapping(value="/getOrderListRaisedBy",method=RequestMethod.POST,produces="application/json")
    public ResponseEntity<List<OrderManagementModel>> getOrderListRaisedBy(HttpServletResponse response,HttpServletRequest request,@RequestBody String Value){
        try {
            log.info("getOrderListRaisedBy() --  Fecthing Orders "+ Value);
            
            return new ResponseEntity<>(orderservice.getOrderList("OrderRaisedBy",Value),HttpStatus.OK);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(ImsOrderManagement.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    @RequestMapping(value="/getOrderListOrderFor",method=RequestMethod.GET,produces="application/json")
    public ResponseEntity getOrderListOrderFor(HttpServletResponse response,HttpServletRequest request,String Value){
        try {
            log.info("getOrderListOrderFor() --  Fecthing Orders "+ Value);
            
            return new ResponseEntity<>(orderservice.getOrderList("OrderFor",Value),HttpStatus.OK);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(ImsOrderManagement.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    @RequestMapping(value="/getOrderListOrderStatus",method=RequestMethod.GET,produces="application/json")
    public ResponseEntity getOrderListOrderStatus(HttpServletResponse response,HttpServletRequest request,String Value){
        try {
            log.info("getOrderListOrderStatus() --  Fecthing Orders "+ Value);
            
            return new ResponseEntity<>(orderservice.getOrderList("OrderStatus",Value),HttpStatus.OK);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(ImsOrderManagement.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

}
