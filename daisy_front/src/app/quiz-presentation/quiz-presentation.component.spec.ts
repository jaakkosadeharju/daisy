import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPresentationComponent } from './quiz-presentation.component';

describe('QuizPresentationComponent', () => {
  let component: QuizPresentationComponent;
  let fixture: ComponentFixture<QuizPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
