import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyArComponent } from './privacy-policy-ar.component';

describe('PrivacyPolicyArComponent', () => {
  let component: PrivacyPolicyArComponent;
  let fixture: ComponentFixture<PrivacyPolicyArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyArComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
