import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUseArComponent } from './terms-of-use-ar.component';

describe('TermsOfUseArComponent', () => {
  let component: TermsOfUseArComponent;
  let fixture: ComponentFixture<TermsOfUseArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsOfUseArComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsOfUseArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
