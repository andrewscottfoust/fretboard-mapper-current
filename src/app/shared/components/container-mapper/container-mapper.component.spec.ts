import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMapperComponent } from './container-mapper.component';

describe('ContainerMapperComponent', () => {
  let component: ContainerMapperComponent;
  let fixture: ComponentFixture<ContainerMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerMapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
