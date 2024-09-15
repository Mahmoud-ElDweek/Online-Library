import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../util/apiUrl';
import { shippingAddress } from '../../interfaces/books.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  userTokenHeader = {
    token: localStorage.getItem('token') || ''
  }

  constructor(private _httpClient: HttpClient) { }

  checkout(cartId: string, data: shippingAddress): Observable<any> {
    return this._httpClient.post(`${apiUrl}/shipping/${cartId}`, {
      data
    },
      {
        headers: this.userTokenHeader
      }
    )
  }
}
