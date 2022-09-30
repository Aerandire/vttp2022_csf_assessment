import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrderSummary[] = []
  email!: string
  name!: string

  constructor(private pizzaSvc: PizzaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email']
    this.pizzaSvc.getOrders(this.email).then(
      result=> {
        //console.info(">>>>result in order view", result)
        this.orders = result
      }
    )
  }

}
