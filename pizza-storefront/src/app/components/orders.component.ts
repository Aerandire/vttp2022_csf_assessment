import { Component, OnInit } from '@angular/core';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrderSummary[] = []

  constructor(private pizzaSvc: PizzaService) { }

  ngOnInit(): void {
    this.pizzaSvc.getOrders().then(
      result=> {
        this.orders = result
      }
    )
  }

}
