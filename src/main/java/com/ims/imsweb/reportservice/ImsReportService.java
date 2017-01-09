package com.ims.imsweb.reportservice;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import org.ims.transactionEngine.securityManager.MiscService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 *
 * @author suri
 */
@WebServlet(name = "IMS_ReportService", urlPatterns = {"/IMS_ReportService"})
public class ImsReportService extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ApplicationContext applicationContext = null;
        MiscService miscService = null;

        String rptFileName = request.getParameter("filename");
        String rptformat = request.getParameter("format");
        String rptDealerNo = request.getParameter("DealerNo");
        String rptCategory = request.getParameter("Category");
        String rptFromDate = request.getParameter("FromDate");
        String rptToDate = request.getParameter("ToDate");
        String rptInvoiceNo = request.getParameter("InvoiceNo");
        
        int option = Integer.parseInt(request.getParameter("OPETYPE"));

        try {

            response.setContentType("application/pdf");

            if (applicationContext == null) {
                System.out.println("setting context in get");
                applicationContext = WebApplicationContextUtils.getWebApplicationContext(this.getServletContext());
            }
            if (applicationContext != null && applicationContext.containsBean("MiscService")) {
                miscService = (MiscService) applicationContext.getBean("MiscService");

            }
            Connection con = miscService.getDataSource().getConnection();

            HashMap jasperParameter = new HashMap();
            switch (option) {
                case 1:
                    jasperParameter.put("DNo", rptDealerNo);
                    break;
                case 2:
                    break;
//                    jasperParameter.put("Category", rptCategory);
                case 3:
                    jasperParameter.put("Dno", rptDealerNo);
                    jasperParameter.put("FromDate", rptFromDate + " 00:00:00");
                    jasperParameter.put("ToDate", rptToDate + " 23:59:59");
                    Statement stmt = con.createStatement();
                    ResultSet rset = stmt.executeQuery("call ims_db.balancesheet_procedure ('" + rptFromDate + "','" + rptToDate + "','" + rptDealerNo + "')");
                    break;
                case 4:
                    jasperParameter.put("DNo", rptDealerNo);
                    break;
                case 5:
                    jasperParameter.put("InvoiceNo", rptInvoiceNo);
                    break;
                case 6:
                    jasperParameter.put("InvoiceNo", rptInvoiceNo);
                    break;
                case 7:
                    jasperParameter.put("SNo", rptDealerNo);
                    jasperParameter.put("FromDate", rptFromDate + " 00:00:00");
                    jasperParameter.put("ToDate", rptToDate + " 23:59:59");
                    stmt = con.createStatement();
                    rset = stmt.executeQuery("call ims_db.supplier_balancesheet_procedure ('" + rptFromDate + "','" + rptToDate + "','" + rptDealerNo + "')");
                    break;

            }
            JasperReport jasperReport;
            JasperPrint jasperPrint;
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ServletOutputStream servletOutputStream = response.getOutputStream();
            
            String Dest = getServletConfig().getServletContext().getRealPath("/webapp/reports/").toString();
            System.out.println(getServletConfig().getServletContext().getRealPath("/webapp/reports/" + rptFileName + ".jrxml").toString());
            System.out.println(Dest + "/" + rptFileName + ".jrxml");
            jasperReport = JasperCompileManager.compileReport(Dest + "/" + rptFileName + ".jrxml");

            jasperPrint = JasperFillManager.fillReport(jasperReport, jasperParameter, con);
            JasperExportManager.exportReportToPdfStream (jasperPrint, baos);
//            JasperExportManager.exportReportToPdfFile(jasperPrint, Dest + "/tmpreports/" + rptFileName + ".pdf");

//            response.sendRedirect("/IMSWEB/webapp/reports/tmpreports/" + rptFileName + ".pdf");

            response.setContentLength(baos.size());
            baos.writeTo(servletOutputStream);
            // close it
            // fis.close();
            // bufferedInputStream.close();
            //  JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/suri/NetBeansProjects/Project-web/Project-web/web/Reports/test.pdf");
            //   exporter.exportReport();
        } catch (Exception e) {
            // display stack trace in the browser
            StringWriter stringWriter = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stringWriter);
            e.printStackTrace(printWriter);
            response.setContentType("text/plain");
            response.getOutputStream().print(stringWriter.toString());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
