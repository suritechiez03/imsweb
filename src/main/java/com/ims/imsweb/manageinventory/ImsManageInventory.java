/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ims.imsweb.manageinventory;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.ims.dao.entity.ImsProductcategory;
import org.ims.transactionEngine.InventoryService.ProductCategoryService;
import org.ims.transactionEngine.InventoryService.ProductService;
import org.ims.transactionEngine.model.ProductCategoryModel;
import org.ims.transactionEngine.model.ProductModel;
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
public class ImsManageInventory {

    @Autowired
    private Loginservice loginservice;

    @Autowired
    private ProductCategoryService productcategoryservice;

    @Autowired
    private ProductService productservice;

    static Logger log = Logger.getLogger(ImsManageInventory.class.getName());

    @RequestMapping(value = "/addProductCategory", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> addProductCategory(HttpServletRequest request, HttpServletResponse response, @RequestBody String productcategoryinfo) {
        log.info("addProductCategory() -- Adding New ProductCategory" + productcategoryinfo);
        ProductCategoryModel productCategoryModel = new ProductCategoryModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            productCategoryModel = objm.readValue(productcategoryinfo, ProductCategoryModel.class);
            productCategoryModel.setEnteredDate(ApplicationUtil.getDate());
            if (productcategoryservice.addProductCategory(productCategoryModel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("addProductCategory() -- Added product Category " + productCategoryModel.getProductcategorycode());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("addProductCategory() -- Failed to add product Category " + productCategoryModel.getProductcategorycode());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.error("addProductCategory()" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/updateProductCategory", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> updateProductCategory(HttpServletRequest request, HttpServletResponse response, @RequestBody String productcategoryinfo) {
        log.info("updateProductCategory() -- Update ProductCategory" + productcategoryinfo);
        ProductCategoryModel productCategoryModel = new ProductCategoryModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            productCategoryModel = objm.readValue(productcategoryinfo, ProductCategoryModel.class);
            productCategoryModel.setEnteredDate(ApplicationUtil.getDate());
            if (productcategoryservice.updateProductCategory(productCategoryModel, loginservice.getLoggedinUserinfo(hs.getAttribute("USerName").toString()))) {
                log.info("updateProductCategory() -- Update product Category " + productCategoryModel.getProductcategorycode());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("updateProductCategory() -- Failed to Update product Category " + productCategoryModel.getProductcategorycode());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.error("updateProductCategory()" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getProductCategoryList", method = RequestMethod.GET)
    public ResponseEntity<List<ProductCategoryModel>> getProductCategoryList(HttpServletRequest request, HttpServletResponse response) {
        log.info("getProductCategory() -- Fetching product Category Details");
        HttpSession hs = request.getSession();

        try {
            List<ProductCategoryModel> productcategorylist = productcategoryservice.Ims_getProductCategoryList();
            if (!productcategorylist.isEmpty()) {

                return new ResponseEntity<>(productcategorylist, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getProductCategory() -- Fetching product Category Details" + E.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST, produces = "text/html")
    public ResponseEntity<String> addProduct(HttpServletRequest request, HttpServletResponse response, @RequestBody String productinfo) {
        log.info("addProduct() -- Adding New Product" + productinfo);
        ProductModel productModel = new ProductModel();
        ObjectMapper objm = new ObjectMapper();
        HttpSession hs = request.getSession();
        try {
            productModel = objm.readValue(productinfo, ProductModel.class);
            productModel.setEnteredDate(ApplicationUtil.getDate());
            if (productservice.addProduct(productModel, loginservice.getLoggedinUserinfo(hs.getAttribute("UserName").toString()))) {
                log.info("addProduct() -- Added product " + productModel.getProductcode());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("addProduct() -- Failed to add product " + productModel.getProductcode());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.error("addProduct()" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    } 
    
    @RequestMapping(value = "/getProductList", method = RequestMethod.GET)
    public ResponseEntity<List<ProductModel>> getProductList(HttpServletRequest request, HttpServletResponse response) {
        log.info("getProduct() -- Fetching product Details");
        HttpSession hs = request.getSession();

        try {
            List<ProductModel> productlist = productservice.Ims_getProductList();
            if (!productlist.isEmpty()) {

                return new ResponseEntity<>(productlist, HttpStatus.OK);
            }
        } catch (Exception E) {
            log.error("getProduct() -- Fetching product Details" + E.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
    }
}
