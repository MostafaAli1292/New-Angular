import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsPrivacyPolicyArComponent } from './doctors-privacy-policy-ar.component';

describe('DoctorsPrivacyPolicyArComponent', () => {
  let component: DoctorsPrivacyPolicyArComponent;
  let fixture: ComponentFixture<DoctorsPrivacyPolicyArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsPrivacyPolicyArComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsPrivacyPolicyArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
