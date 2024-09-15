import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckOutService } from '../../services/check-out/check-out.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {

  constructor(private _checkOutService:CheckOutService, private _activatedRoute:ActivatedRoute){ }

  isLoading:boolean=false;
  shippingAddressForm:FormGroup=new FormGroup({
    details: new FormControl(null,[Validators.required]),
  phone: new FormControl(null,[Validators.required]),
  city: new FormControl(null,[Validators.required]),

  })


handleSubmit(){
if(this.shippingAddressForm.valid){
  this._activatedRoute.paramMap.subscribe({
    next: p =>{
          this._checkOutService.checkout(p.get('cartId')! , this.shippingAddressForm.value).subscribe({
          next:res=>{
            window.open(res.url,"_self")
            // window.open(res.session.url,"_self")
          }
        })
      console.log(this.shippingAddressForm.value);
      
    }
  })
  

}


}






showInputs = false;

toggleInputs() {
  this.showInputs = !this.showInputs;
}

}
