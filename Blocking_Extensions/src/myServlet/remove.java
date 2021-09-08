package myServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/**
* Servlet implementation class Serv
*/
//@WebServlet("/ajaxCon")
public class remove extends HttpServlet {
   private static final long serialVersionUID = 1L;
      
   /**
    * @see HttpServlet#HttpServlet()
    */
   public remove() {
       super();
       // TODO Auto-generated constructor stub
   }
   private Connection conn;
   private PreparedStatement pstmt;
   private ResultSet rs;
   /**
    * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
    */
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       // TODO Auto-generated method stub
       response.setContentType("application/x-json; charset=UTF-8");
       String extension = request.getParameter("extension");
       try {
			String dbURL = "jdbc:mysql://localhost:3306/blocking_extensions?serverTimezone=UTC";
			String dbID = "root";
			String dbPassword = "123123";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
		}catch(Exception e) {
		e.printStackTrace();
		}
       
		String SQL = "delete from extensions where extension=?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, extension);
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}
   }
}
