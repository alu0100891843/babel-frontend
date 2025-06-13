import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class ApiService {
  protected http = inject(HttpClient);
}
