import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RqCreateCandidate } from '../models/candidate/rq-create-candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) {}

  createCandidate(candidate: RqCreateCandidate) {
  }
}
