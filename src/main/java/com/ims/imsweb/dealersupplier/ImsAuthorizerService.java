/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ims.imsweb.dealersupplier;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ims.imsweb.dealersupplier.ImsDealerService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.ims.transactionEngine.DealerService.DealerAuthorizerService;
import org.ims.transactionEngine.DealerService.DealerService;
import org.ims.transactionEngine.SupplierService.SupplierAuthorizerService;
import org.ims.transactionEngine.SupplierService.SupplierService;
import org.ims.transactionEngine.model.AuthorizerModel;
import org.ims.transactionEngine.model.DealerModel;
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
public class ImsAuthorizerService {

    @Autowired
    private Loginservice loginservice;
    @Autowired
    private SupplierService supplierMaster;
    @Autowired
    private DealerService dealerMaster;
    @Autowired
    private DealerAuthorizerService dealerauthorizerMaster;
    @Autowired
    private SupplierAuthorizerService supplierauthorizerMaster;

    static Logger log = Logger.getLogger(ImsDealerService.class.getName());

    @RequestMapping(value = "/getDealerAuthorizerNo", method = RequestMethod.GET, produces = "text/html")
    public ResponseEntity<String> getDealerAuthorizerNo(HttpServletRequest request, HttpServletResponse response) {
        String dealerauthorizerNo = dealerauthorizerMaster.imsGenerateDealerAuthorizerNumber();
        if (!"".equals(dealerauthorizerNo)) {
            HttpSession hs = request.getSession();
            hs.setAttribute("DealerAuthorizerNo", dealerauthorizerNo);
            return new ResponseEntity<>(dealerauthorizerNo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/getSupplierAuthorizerNo", method = RequestMethod.GET, produces = "text/html")
    public ResponseEntity<String> getSupplierNo(HttpServletRequest request, HttpServletResponse response) {
        String supplierauthorizerNo = supplierauthorizerMaster.imsGenerateSupplierAuthorizerNumber();
        if (!"".equals(supplierauthorizerNo)) {
            HttpSession hs = request.getSession();
            hs.setAttribute("SupplierAuthorizerNO", supplierauthorizerNo);
            return new ResponseEntity<>(supplierauthorizerNo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/addDealerAuthorizer", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> addNewDealerAuthorizer(HttpServletRequest request, HttpServletResponse response, @RequestBody String dealerauthorizerinfo) {
        log.info("addNewDealerAuthorizer() -- Adding New DealerAuthorizer " + dealerauthorizerinfo);
        AuthorizerModel authorizermodel = new AuthorizerModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {

            authorizermodel = objm.readValue(dealerauthorizerinfo, AuthorizerModel.class);
            authorizermodel.setEnteredDate(ApplicationUtil.getDate());
            authorizermodel.setStatus(Boolean.TRUE);
            if (dealerauthorizerMaster.saveDealerAuthorizerDetails(authorizermodel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("addNewDealerAuthorizer() -- Added New DealerAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("addNewDealer() -- Failed to add New DealerAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("addNewDealerAuthorizer() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/updateDealerAuthorizer", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> updateDealerAuthorizer(HttpServletRequest request, HttpServletResponse response, @RequestBody String dealerauthorizerinfo) {
        log.info("updateDealerAuthorizer() -- Updating DealerAuthorizer  " + dealerauthorizerinfo);
        AuthorizerModel authorizermodel = new AuthorizerModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {

            authorizermodel = objm.readValue(dealerauthorizerinfo, AuthorizerModel.class);
            authorizermodel.setEnteredDate(ApplicationUtil.getDate());
            authorizermodel.setStatus(Boolean.TRUE);
            if (dealerauthorizerMaster.updateDealerAuthorizerDetails(authorizermodel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("updateDealerAuthorizer() -- update Successfully DealerAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("updateDealer() -- Failed to Update DealerAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("updateDealerAuthorizer() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/addSupplierAuthorizer", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> addSupplierAuthorizer(HttpServletRequest request, HttpServletResponse response, @RequestBody String supplierauthorizerinfo) {
        log.info("addSupplierAuthorizer() -- Add SupplierAuthorizer  " + supplierauthorizerinfo);
        AuthorizerModel authorizermodel = new AuthorizerModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {

            authorizermodel = objm.readValue(supplierauthorizerinfo, AuthorizerModel.class);
            authorizermodel.setEnteredDate(ApplicationUtil.getDate());
            authorizermodel.setStatus(Boolean.TRUE);
            if (supplierauthorizerMaster.saveSupplierAuthorizerDetails(authorizermodel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("addSupplierAuthorizer() -- Add Successfully SupplierAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("addSupplier() -- Failed to Add SupplierAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("addSupplierAuthorizer() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/updateSupplierAuthorizer", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<String> updateSupplierAuthorizer(HttpServletRequest request, HttpServletResponse response, @RequestBody String supplierauthorizerinfo) {
        log.info("updateSupplierAuthorizer() -- Update SupplierAuthorizer  " + supplierauthorizerinfo);
        AuthorizerModel authorizermodel = new AuthorizerModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {

            authorizermodel = objm.readValue(supplierauthorizerinfo, AuthorizerModel.class);
            authorizermodel.setEnteredDate(ApplicationUtil.getDate());
            authorizermodel.setStatus(Boolean.TRUE);
            if (supplierauthorizerMaster.updateSupplierAuthorizerDetails(authorizermodel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("updateSupplierAuthorizer() -- Update Successfully SupplierAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("updateSupplier() -- Failed to Update SupplierAuthorizer " + authorizermodel.getAuthorizerId());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("updateSupplierAuthorizer() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getDealerAuthorizerList", method = RequestMethod.GET)
    public ResponseEntity<List<AuthorizerModel>> getDealerAuthorizerList(HttpServletRequest request, HttpServletResponse response) {
        log.info("getDealerAuthorizerList() -- Fetching authorizer Details");
        HttpSession hs = request.getSession();

        try {

            List<AuthorizerModel> dealerauthorizers = dealerauthorizerMaster.Ims_getDealerAuhtorizerList(null);
            if (!dealerauthorizers.isEmpty()) {

                return new ResponseEntity<>(dealerauthorizers, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getDealerAuthorizerList() -- Fetching authorizer Details" + E.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/getSupplierAuthorizerList", method = RequestMethod.GET)
    public ResponseEntity<List<AuthorizerModel>> getSupplierAuthorizerList(HttpServletRequest request, HttpServletResponse response) {
        log.info("getSupplierAuthorizerList() -- Fetching authorizer Details");
        HttpSession hs = request.getSession();

        try {

            List<AuthorizerModel> supplierauthorizers = supplierauthorizerMaster.Ims_getSupplierAuhtorizerList(null);
            if (!supplierauthorizers.isEmpty()) {

                return new ResponseEntity<>(supplierauthorizers, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getSupplierAuthorizerList() -- Fetching authorizer Details" + E.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

}
