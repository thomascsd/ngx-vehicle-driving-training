import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { toSignal } from '@angular/core/rxjs-interop';
import { Trainer } from '../../core/models/trainer';
import { TrainerService } from '../../core/services/trainer.service';
import { pagerConfig } from '../../shared/util/pager.config';
import { PagerComponent } from '../../shared/components/pager/pager.component';

@Component({
  selector: 'app-trainer-list',
  imports: [CommonModule, FormsModule, NgxPaginationModule, PagerComponent],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.scss',
})
export class TrainerListComponent {
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
