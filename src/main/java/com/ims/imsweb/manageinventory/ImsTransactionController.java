package com.ims.imsweb.manageinventory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.ims.transactionEngine.InventoryService.InvoiceService;
import org.ims.transactionEngine.InventoryService.TransactionManagementService;
import org.ims.transactionEngine.model.TransactionModel;
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

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

/****
 * 
 * @author skumar
 *
 */
@EnableWebMvc
@RestController
public class ImsTransactionController {
	
	@Autowired
	private Loginservice loginservice;
	@Autowired
	private TransactionManagementService managetran;
	
	static Logger log = Logger.getLogger(ImsTransactionController.class.getName());

	@RequestMapping(value = "/ProcessPayment", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<TransactionModel> ProcessPayment(HttpServletRequest request, HttpServletResponse response,@RequestBody String Paymentinfo)
	{
		log.info("Processing payment started... " + request.getSession().getId());
		TransactionModel trans=new TransactionModel();
		log.info(Paymentinfo);
		try{
			ObjectMapper objm=new ObjectMapper();
			objm.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			trans=objm.readValue(Paymentinfo,TransactionModel.class);
			log.info("Mapping object details successfull");
			trans.setEnteredDate(ApplicationUtil.getDate());
			trans.setTransactionId(managetran.processPayment(trans, loginservice.getLoggedinUserinfo(request.getSession().getAttribute("UserName").toString())));
			trans.setTranStatus(true);
			log.info("Payment Processing successfull for transaction id" + trans.getTransactionId());
		}catch(Exception e){
			
			log.info(" Error while Processing payment" + request.getSession().getId());
			log.error(e.getMessage());
			return new ResponseEntity(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity(trans,HttpStatus.OK);
	}
}
