import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  form!: FormGroup

  pizzaSize = SIZES[0]

  constructor(private fb: FormBuilder) {
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
    console.info(">>>>>>>Data", data)
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
