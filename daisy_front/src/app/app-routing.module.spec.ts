import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;


  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [
      AppComponent], imports: [RouterTestingModule]});
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
