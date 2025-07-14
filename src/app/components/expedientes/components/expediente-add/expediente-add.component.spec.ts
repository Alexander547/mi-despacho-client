/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExpedienteAddComponent } from './expediente-add.component';

describe('ExpedienteAddComponent', () => {
  let component: ExpedienteAddComponent;
  let fixture: ComponentFixture<ExpedienteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
