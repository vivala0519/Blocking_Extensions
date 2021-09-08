package myServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
public class Serv extends HttpServlet {
   private static final long serialVersionUID = 1L;
      
   public Serv() {
       super();
   }
   private Connection conn;
   private PreparedStatement pstmt;
   private ResultSet rs;
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       // TODO Auto-generated method stub
       response.setContentType("application/x-json; charset=UTF-8");
       PrintWriter out = response.getWriter();
       String extension = request.getParameter("extension");
       String checked = request.getParameter("checked");
       
   
       try {
			String dbURL = "jdbc:mysql://localhost:3306/blocking_extensions?serverTimezone=UTC";
			String dbID = "root";
			String dbPassword = "123123";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
		}catch(Exception e) {
		e.printStackTrace();
		}
       
		String SQL = "UPDATE EXTENSIONS SET checked=? WHERE extension=?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, Integer.parseInt(checked));
			pstmt.setString(2, extension);
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}
   }
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       // TODO Auto-generated method stub
       response.setContentType("application/x-json; charset=UTF-8");
       PrintWriter out = response.getWriter();
       try {
			String dbURL = "jdbc:mysql://localhost:3306/blocking_extensions?serverTimezone=UTC";
			String dbID = "root";
			String dbPassword = "123123";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
		}catch(Exception e) {
		e.printStackTrace();
		}
	
		String SQL = "SELECT * from EXTENSIONS";
		try {
			pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			String extension = "";
			int checked = 0;
			String data = "";
			while (rs.next()) {
				extension = rs.getString(1);
				checked = rs.getInt(2);
				data += extension + "," + checked + ",";
			}
			out.print(data);
		}catch(Exception e) {
			e.printStackTrace();
		}
           
   }
}
