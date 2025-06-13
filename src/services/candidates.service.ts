import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RqCreateCandidate } from '../models/candidate/rq-create-candidate';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Candidate } from '../models/candidate/candidate';
import { environment } from '../environments/environment';
import { constants } from '../constants/constants';
import { ApiService } from './parent/api.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService extends ApiService {

  private readonly STORAGE_KEY = constants.SERVICES.CANDIDATES.storageKey
  private readonly API_URL = `${environment.API_URL}${constants.SERVICES.CANDIDATES.path}`;

  private candidatesSubject = new BehaviorSubject<Candidate[]>([]);
  public candidates$ = this.candidatesSubject.asObservable();

  constructor() {
    super();
    this.candidatesSubject.next(this.loadCandidatesFromStorage());
  }

  private loadCandidatesFromStorage(): Candidate[] {
    const storedCandidates = localStorage.getItem(constants.SERVICES.CANDIDATES.storageKey);

    if (!storedCandidates) {
      return [];
    }
    const candidates = JSON.parse(storedCandidates).map((candidate: any) =>
      Candidate.createFromJson(candidate)
    );
    return candidates;
  }

  private updateLocalStorage(candidates: Candidate[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(candidates));
  }

  private storeCandidate(newCandidate: Candidate): void {
    const currentCandidates = this.candidatesSubject.value;
    const updatedCandidates = [...currentCandidates, newCandidate];

    this.candidatesSubject.next(updatedCandidates);
    this.updateLocalStorage(updatedCandidates);
  }

  public createCandidate(candidate: RqCreateCandidate): Observable<Candidate> {
    const url = `${this.API_URL}${constants.SERVICES.CANDIDATES.createCandidate.url}`;
    const formData = new FormData();
    Object.entries(candidate).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return this.http.post<Candidate>(url, formData).pipe(
      tap(result => {
        const newCandidate = Candidate.createFromJson(result);
        this.storeCandidate(newCandidate);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
