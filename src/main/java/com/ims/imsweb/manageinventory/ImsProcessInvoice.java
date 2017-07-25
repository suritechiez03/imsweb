/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ims.imsweb.manageinventory;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import static com.ims.imsweb.manageinventory.ImsOrderManagement.log;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.ims.transactionEngine.InventoryService.InvoiceService;
import org.ims.transactionEngine.InventoryService.OrderManagementService;
import org.ims.transactionEngine.model.InvoiceModel;
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
@RestController
@EnableWebMvc
public class ImsProcessInvoice {
 @Autowired
    private Loginservice loginservice;
    @Autowired
    private OrderManagementService orderservice;
    @Autowired
    private InvoiceService  invoiceservice;
    static Logger log = Logger.getLogger(ImsManageInventory.class.getName());
     @RequestMapping(value = "/getSalesInvoiceNo", method = RequestMethod.GET, produces = "text/html")
    public ResponseEntity getSalesInvoiceNo(HttpServletResponse response, HttpServletRequest request) {
        log.info("Generating new Invoice Number");
        return new ResponseEntity<>(invoiceservice.getSalesInvoiceNo(),HttpStatus.OK);
    }
    @RequestMapping(value = "/ProcessInvoice", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity ProcessInvoice(HttpServletResponse response, HttpServletRequest request, @RequestBody String orderdetails) {
            log.info("ProcessInvoice() --  New Order" + orderdetails);
            OrderManagementModel ordermodel = new OrderManagementModel();
            InvoiceModel invoice=new InvoiceModel();
        try {  

            ObjectMapper objm = new ObjectMapper();
            objm.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            HttpSession hs = request.getSession();
            
            ordermodel =objm.readValue(orderdetails, OrderManagementModel.class);
            invoice=objm.readValue(orderdetails, InvoiceModel.class);
            ordermodel.setEnteredDate(ApplicationUtil.getDate());
            invoice.setEnteredDate(ApplicationUtil.getDate());
            
            ordermodel.setGeneratedOrderNo(invoiceservice.ProcessInvoice(ordermodel, invoice, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString())));
//            ordermodel.setGeneratedOrderNo(orderservice.saveOrder(ordermodel,loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString())));
            return new ResponseEntity(ordermodel,HttpStatus.OK);
        } catch (Exception ex) {
            log.error("ProcessInvoice() --  New Order" + orderdetails);
            return new ResponseEntity<>(ordermodel,HttpStatus.INTERNAL_SERVER_ERROR);
        } 
        
    } 
    @RequestMapping(value = "/getInvoicebyNo", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity getInvoicebyNo(HttpServletResponse response, HttpServletRequest request,@RequestBody String InvoiceNo) {
        log.info("Fetching Invoice Details " + InvoiceNo);
        return new ResponseEntity<>(invoiceservice.getInvoiceDetailsByNo(InvoiceNo),HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getInvoiceList", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<List<InvoiceModel>> getInvoiceList(HttpServletResponse response, HttpServletRequest request,@RequestBody String InvoiceNo) {
        log.info("Fetching Invoice Details ");
        return new ResponseEntity<>(invoiceservice.getInvoiceDetailsList(InvoiceNo),HttpStatus.OK);
    }

}
