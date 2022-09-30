package vttp2022.assessment.csf.orderbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
@RequestMapping(path="/api/order", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderRestController {

    @Autowired
	private OrderService orderSvc;

	@GetMapping(path="{email}/all")
	public ResponseEntity<String> getOrders(@PathVariable String email) {

        List<OrderSummary> summaries = orderSvc.getOrdersByEmail(email);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (OrderSummary summary: summaries)
            arrBuilder.add(summary.toJson());

        return ResponseEntity.ok(arrBuilder.build().toString());
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postOrders(@RequestPart String name, 
    @RequestPart String email, @RequestPart Integer pizza_size, @RequestPart Integer thick_crust, 
    @RequestPart String sauce, @RequestPart List<String> topppings, @RequestPart String comments){

        System.out.print(name);
        return ResponseEntity.ok("result");
    }

}
