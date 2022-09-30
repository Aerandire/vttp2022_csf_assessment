package vttp2022.assessment.csf.orderbackend.repositories;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;

@Repository
public class OrderRepository {

    private static final String SQL_GET_ORDER_BY_EMAIL = "SELECT * FROM orders where email = ?";
    private static final String SQL_INSERT_ORDER_BY_EMAIL = "INSERT INTO orders (name,email,pizza_size,thick_crust,sauce,toppings,comments)";


    @Autowired
    private JdbcTemplate template;

    public List<Order> getOrder(String email) {
        List<Order> orders = new LinkedList<>();

        SqlRowSet rs = template.queryForRowSet(SQL_GET_ORDER_BY_EMAIL, email);
        while (rs.next()) {
            Order order = Order.create(rs);
            orders.add(order);
        }
        return orders;
    }

    public Boolean insertOrder(Order o){
        
        
        int count = template.update(SQL_INSERT_ORDER_BY_EMAIL,o.getName(),o.getEmail(),o.getSize(),o.isThickCrust(),o.getSauce(),o.getToppings(),o.getComments());
        
        if(count == 0)
            return false;
        else
            return true;
    }
    
}
