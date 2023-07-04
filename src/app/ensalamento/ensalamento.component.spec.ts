import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsalamentoComponent } from './ensalamento.component';

describe('EnsalamentoComponent', () => {
  let component: EnsalamentoComponent;
  let fixture: ComponentFixture<EnsalamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsalamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnsalamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
