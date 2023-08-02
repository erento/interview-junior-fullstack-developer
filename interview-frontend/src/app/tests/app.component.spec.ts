import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app_component/app.component';
import { AppModule } from '../app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [AppModule]
  }).compileComponents()}))

  beforeEach(() => {
  fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();})

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'interview-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('interview-frontend');
  });

  //Testing isStringOnlyCharacters function

  it('should return false for string which consists numbers', () => {
    const result = component.isStringOnlyCharacters("h4");
    expect(result).toBe(false);
  });

  it('should return false for string which consists special character', () => {
    const result = component.isStringOnlyCharacters("*");
    expect(result).toBe(false);
  });

  it('should return true for string which only consists letters', () => {
    const result = component.isStringOnlyCharacters("be");
    expect(result).toBe(true);
  });
});