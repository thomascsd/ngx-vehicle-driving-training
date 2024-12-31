import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { toSignal } from '@angular/core/rxjs-interop';
import { Trainer } from '../core/models/trainer';
import { TrainerService } from '../core/services/trainer.service';
import { pagerConfig } from '../shared/util/pager.config';

@Component({
  selector: 'app-trainer',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss',
})
export class TrainerComponent {
  trainers: Signal<Trainer[]>;
  config = pagerConfig;

  name = '';
  id = '';
  mobile = '';

  constructor(private trainerService: TrainerService) {
    this.trainers = toSignal(this.trainerService.getTrainers(), {
      initialValue: [],
    });
  }

  query() {
    if (this.name) {
      this.trainers = computed(() =>
        this.trainers().filter((trainer) => trainer.name.includes(this.name)),
      );
    }

    if (this.id) {
      this.trainers = computed(() =>
        this.trainers().filter((trainer) => trainer.id.includes(this.id)),
      );
    }

    if (this.mobile) {
      this.trainers = computed(() =>
        this.trainers().filter((trainer) =>
          trainer.mobile.includes(this.mobile),
        ),
      );
    }
  }
}
