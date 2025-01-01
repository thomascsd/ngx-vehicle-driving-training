import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerListComponent } from './trainer-list.component';
import { TrainerService } from '../../core/services/trainer.service';
import { of } from 'rxjs';

describe('TrainerListComponent', () => {
  let component: TrainerListComponent;
  let fixture: ComponentFixture<TrainerListComponent>;
  let trainerService: jasmine.SpyObj<TrainerService>;

  beforeEach(async () => {
    const trainerServiceSpy = jasmine.createSpyObj('TrainerService', [
      'getTrainers',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TrainerListComponent],
      providers: [{ provide: TrainerService, useValue: trainerServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerListComponent);
    component = fixture.componentInstance;
    trainerService = TestBed.inject(
      TrainerService,
    ) as jasmine.SpyObj<TrainerService>;
    trainerService.getTrainers.and.returnValue(of([])); // Mock the service call
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTrainers on init', () => {
    expect(trainerService.getTrainers).toHaveBeenCalled();
  });

  it('should have an empty trainer list initially', () => {
    expect(component.trainers.length).toBe(0);
  });

  // Add more tests as needed
});
