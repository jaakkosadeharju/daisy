import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InPlaceEditorComponent } from './in-place-editor.component';

describe('InPlaceEditorComponent', () => {
  let component: InPlaceEditorComponent;
  let fixture: ComponentFixture<InPlaceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InPlaceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InPlaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
