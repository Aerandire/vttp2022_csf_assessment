import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  path = [ '', '/orders' ]
  form!: FormGroup
  pizzaSize = SIZES[0]

  constructor(private fb: FormBuilder, private router: Router, private pizzaSvc: PizzaService,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('',[Validators.required, Validators.minLength(6)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      pizzaS: this.fb.control<string>('',[Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('',[Validators.required]),
      toppings: new FormArray([],[Validators.required]),
      comments: this.fb.control<string>('')
    })
  }

  processForm() {
    const data = this.form.value
    const email = this.form.controls['email'].value
    console.info(">>>>>>>Data", data)
    const formData = new FormData();
    formData.append('name', this.form.controls['name'].value);
    formData.append('email', this.form.controls['email'].value);
    formData.append('pizza_size', this.form.controls['pizzaS'].value);
    formData.append('thick_crust', this.form.controls['base'].value);
    formData.append('sauce', this.form.controls['sauce'].value);
    formData.append('toppings', this.form.controls['toppings'].value);
    formData.append('comments', this.form.controls['comments'].value);

    this.pizzaSvc.createOrder(formData)
      .then(result=> {
        //console.info('>>>resultButtonpress', result)
        this.router.navigate(['/orders' , email])
      })
  }

  getButton(email: string){
    this.pizzaSvc.getOrders(email)
      .then(result=> {
        //console.info('>>>resultButtonpress', result)
        this.router.navigate(['/orders' , email])
      })

  }

  onCheckboxChange(event: any) {

    const selectedToppings = (this.form.controls['toppings'] as FormArray)
    if (event.target.checked) {
      selectedToppings.push(new FormControl(event.target.value));
    } else {
      const index = selectedToppings.controls
      .findIndex(x => x.value === event.target.value);
      selectedToppings.removeAt(index);
    }

  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

}
