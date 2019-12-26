import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionsReceivedComponent } from './opinions-received.component';

describe('OpinionsReceivedComponent', () => {
  let component: OpinionsReceivedComponent;
  let fixture: ComponentFixture<OpinionsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
