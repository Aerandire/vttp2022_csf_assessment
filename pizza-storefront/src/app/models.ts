// Add your models here if you have any
export interface OrderSummary {
    orderID: string
    name: string
    email: string
    pizzaSize: string
    base: string
    sauce: string
    toppings: []
    comments: string
}