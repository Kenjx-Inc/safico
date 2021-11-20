import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MobileMoneyApiService {

  // POST CONFIGURATIONS(AIRTEL00)
  private INPUT_BODY_AIRTEL = {
    "reference": "Testing transaction",
    "subscriber": {
      "country": "UG",
      "currency": "UGX",
      "msisdn": 750782906
    },
    "transaction": {
      "amount": 9000,
      "country": "UG",
      "currency": "UGX",
      "id": "random-unique-id"
    }
  }

  private HEADERS_AIRTEL = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'X-Country': 'UG',
    'X-Currency': 'UGX',
    'Authorization': 'f6ef5aa5-dd55-4b4f-a789-51fdaaaeccc0'
  };


  // POST CONFIGURATIONS (MTN)


  constructor(private http: HttpClient) { }

  // Call to Airtel Payment
  makePaymentViaAitel() {
    return this.http.post('https://openapiuat.airtel.africa/merchant/v1/payments/', {
      method: 'POST',
      body: this.INPUT_BODY_AIRTEL,
      headers: this.HEADERS_AIRTEL
    })
  }

  // Call to MTN Mobile Money
  makePaymentViaMTN() {
    // Call to MTN Payment
    return this.http.post('/openapiuat.airtel.africa/merchant/v1/payments/', {
      method: 'POST',
      body: "",
      headers: ""
    })
  }
}