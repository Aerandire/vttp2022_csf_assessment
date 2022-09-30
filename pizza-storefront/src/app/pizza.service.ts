// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { OrderSummary } from "./models";

@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(formData: FormData) { 
    return firstValueFrom(    
      this.http.post<FormData>('/api/order', formData)
    )
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string) { 
    return firstValueFrom(
      this.http.get<OrderSummary[]>('/api/order/' + email + '/all')
    )
  }


}
