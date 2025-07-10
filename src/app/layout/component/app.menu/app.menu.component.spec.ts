/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { App.menuComponent } from './app.menu.component';

describe('App.menuComponent', () => {
  let component: App.menuComponent;
  let fixture: ComponentFixture<App.menuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ App.menuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(App.menuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
