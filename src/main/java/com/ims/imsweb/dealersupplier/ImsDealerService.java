package com.ims.imsweb.dealersupplier;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.ims.transactionEngine.DealerService.DealerService;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
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
 * @author suri
 */
@EnableWebMvc
@RestController
public class ImsDealerService {
//     ApplicationContext context = new ClassPathXmlApplicationContext("imsbeans.xml");

    @Autowired
    private DealerService dealerMaster;
    @Autowired
    private Loginservice loginservice;

    static Logger log = Logger.getLogger(ImsDealerService.class.getName());

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<List<DealerModel>> listAllUsers() {
        List<DealerModel> dealers = dealerMaster.Ims_getDealerList(null);
        if (dealers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<>(dealers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getDealerNo", method = RequestMethod.GET, produces = "text/html")
    public ResponseEntity<String> getDealerNo(HttpServletRequest request, HttpServletResponse response) {
        String dealerNo = dealerMaster.imsGenerateDealerNumber();
        if (!"".equals(dealerNo)) {
            HttpSession hs = request.getSession();
            hs.setAttribute("DEALER_NO", dealerNo);
            return new ResponseEntity<>(dealerNo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/addDealer", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> addNewDealer(HttpServletRequest request, HttpServletResponse response, @RequestBody String dealerinfo) {
        log.info("addNewDealer() -- Adding New Dealer " + dealerinfo);
        DealerModel dealerModel = new DealerModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            dealerModel = objm.readValue(dealerinfo, DealerModel.class);
            dealerModel.setEnteredDate(ApplicationUtil.getDate());
            dealerModel.setStatus(Boolean.TRUE);
            if (dealerMaster.saveDealerDetails(dealerModel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("addNewDealer() -- Added New Dealer " + dealerModel.getDealerNumber());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("addNewDealer() -- Failed to add New Dealer " + dealerModel.getDealerNumber());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("addNewDealer() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getDealerList", method = RequestMethod.GET)
    public ResponseEntity<List<DealerModel>> getDealerList(HttpServletRequest request, HttpServletResponse response) {
        log.info("getDealerList() -- Fetching dealer Details");
        HttpSession hs = request.getSession();

        try {
            List<DealerModel> dealers = dealerMaster.Ims_getDealerList(null);
            if (!dealers.isEmpty()) {

                return new ResponseEntity<>(dealers, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getDealerList() -- Fetching dealer Details" + E.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/getDealerByID", method = RequestMethod.POST)
    public ResponseEntity<DealerModel> getDealerByID(HttpServletRequest request, HttpServletResponse response, @RequestBody String dealerid) {
        log.info("getDealerByID() -- Fetching dealer Details");
        HttpSession hs = request.getSession();

        try {
            DealerModel dealers = dealerMaster.Ims_getDealerByID(dealerid);
            if (dealers != null) {

                return new ResponseEntity(dealers, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getDealerById() -- Fetching dealer Details" + E.getMessage());
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/updateDealer", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> updateDealer(HttpServletRequest request, HttpServletResponse response, @RequestBody String dealerinfo) {
        log.info("updateDealer() -- Update Dealer " + dealerinfo);
        DealerModel dealerModel = new DealerModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            dealerModel = objm.readValue(dealerinfo, DealerModel.class);
            dealerModel.setEnteredDate(ApplicationUtil.getDate());
            dealerModel.setStatus(Boolean.TRUE);
            if (dealerMaster.updateDealerDetails(dealerModel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("updateDealer() --Update Dealer  " + dealerModel.getDealerNumber());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("updateDealer() -- Failed to Update Dealer " + dealerModel.getDealerNumber());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception E) {
            log.error("updateDealer() " + E.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
