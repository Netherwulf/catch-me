import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOpinionsComponent } from './my-opinions.component';

describe('MyOpinionsComponent', () => {
  let component: MyOpinionsComponent;
  let fixture: ComponentFixture<MyOpinionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOpinionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
