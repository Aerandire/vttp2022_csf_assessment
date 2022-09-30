package vttp2022.assessment.csf.orderbackend.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private PricingService priceSvc;

	@Autowired
	private OrderRepository oRepo;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public void createOrder(Order order) {
		Boolean status = oRepo.insertOrder(order);
		System.out.println(status);
	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		// Use priceSvc to calculate the total cost of an order
		List<Order> orders = new LinkedList<>();
		orders = oRepo.getOrder(email);
		List<OrderSummary> summaries = new LinkedList<>();

		for(Order o: orders){
			Float amount = priceSvc.size(o.getSize());
			amount += priceSvc.sauce(o.getSauce());
			//amount += priceSvc.topping(o.getToppings());
			if(o.isThickCrust() == true){
				amount+= priceSvc.thickCrust();
			}
			else{
				amount+= priceSvc.thinCrust();
			}
			summaries.add(OrderSummary.create(o.getOrderId(), o.getName(), o.getEmail(), amount));
		}

		return summaries;
	}
}
