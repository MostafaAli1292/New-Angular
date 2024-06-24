import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskeslistComponent } from './askeslist.component';

describe('AskeslistComponent', () => {
  let component: AskeslistComponent;
  let fixture: ComponentFixture<AskeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskeslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
