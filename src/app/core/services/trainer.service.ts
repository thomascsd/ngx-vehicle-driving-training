import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';

export class TrainerService {
  constructor(private http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>('/api/trainers');
  }

  saveTrainer(trainer: Trainer) {
    return this.http.post('/api/trainers', trainer);
  }
}
