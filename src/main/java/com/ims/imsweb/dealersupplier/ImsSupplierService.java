/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ims.imsweb.dealersupplier;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.ims.transactionEngine.SupplierService.SupplierService;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.ims.transactionEngine.model.SupplierModel;
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
 * @author suri
 */
@EnableWebMvc
@RestController
public class ImsSupplierService {
//     ApplicationContext context = new ClassPathXmlApplicationContext("imsbeans.xml");

    @Autowired
    private SupplierService supplierMaster;
    @Autowired
    private Loginservice loginservice;

    static Logger log = Logger.getLogger(ImsSupplierService.class.getName());

//    @RequestMapping(value = "/user", method = RequestMethod.GET)
//    public ResponseEntity<List<SupplierModel>> listAllUsers() {
//        List<SupplierModel> suppliers = supplierMaster.Ims_getSupplierList(null);
//        if (suppliers.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
//        }
//        return new ResponseEntity<>(suppliers, HttpStatus.OK);
//    }

    @RequestMapping(value = "/getSupplierNo", method = RequestMethod.GET, produces = "text/html")
    public ResponseEntity<String> getSupplierNo(HttpServletRequest request, HttpServletResponse response) {
        String supplierNo = supplierMaster.imsGenerateSupplierNumber();
        if (!"".equals(supplierNo)) {
            HttpSession hs = request.getSession();
            hs.setAttribute("SUPPLIER_NO", supplierNo);
            return new ResponseEntity<>(supplierNo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/addSupplier", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> addNewSupplier(HttpServletRequest request, HttpServletResponse response, @RequestBody String supplierinfo) {
        log.info("addNewSupplier() -- Adding New Supplier " + supplierinfo);
        SupplierModel supplierModel = new SupplierModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            supplierModel = objm.readValue(supplierinfo, SupplierModel.class);
            supplierModel.setEnteredDate(ApplicationUtil.getDate());
            supplierModel.setStatus(Boolean.TRUE);
            if (supplierMaster.saveSupplierDetails(supplierModel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("addNewSupplier() -- Added New Supplier " + supplierModel.getSupplierNumber());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("addNewSupplier() -- Failed to add New Supplier " + supplierModel.getSupplierNumber());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("addNewSupplier() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getSupplierList", method = RequestMethod.GET)
    public ResponseEntity<List<SupplierModel>> getSupplierList(HttpServletRequest request, HttpServletResponse response) {
        log.info("getSupplierList() -- Fetching supplier Details");
        HttpSession hs = request.getSession();

        try {
            List<SupplierModel> suppliers = supplierMaster.Ims_getSupplierList(null);
            if (!suppliers.isEmpty()) {

                return new ResponseEntity<>(suppliers, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getSupplierList() -- Fetching supplier Details" + E.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/updateSupplier", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> updateSupplier(HttpServletRequest request, HttpServletResponse response, @RequestBody String supplierinfo) {
        log.info("updateSupplier() -- Update Supplier " + supplierinfo);
        SupplierModel supplierModel = new SupplierModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            supplierModel = objm.readValue(supplierinfo, SupplierModel.class);
            supplierModel.setEnteredDate(ApplicationUtil.getDate());
            supplierModel.setStatus(Boolean.TRUE);
            if (supplierMaster.updateSupplierDetails(supplierModel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("updateSupplier() --Update Supplier  " + supplierModel.getSupplierNumber());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("updateSupplier() -- Failed to Update Supplier " + supplierModel.getSupplierNumber());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("updateSupplier() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
