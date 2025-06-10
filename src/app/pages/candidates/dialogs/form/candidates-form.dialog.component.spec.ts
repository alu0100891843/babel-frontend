import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesFormDialogComponent } from './candidates-form.dialog.component';

describe('FormComponent', () => {
  let component: CandidatesFormDialogComponent;
  let fixture: ComponentFixture<CandidatesFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
