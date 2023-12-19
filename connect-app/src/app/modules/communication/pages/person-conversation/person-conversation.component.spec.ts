import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonConversationComponent } from './person-conversation.component';

describe('PersonConversationComponent', () => {
  let component: PersonConversationComponent;
  let fixture: ComponentFixture<PersonConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonConversationComponent]
    });
    fixture = TestBed.createComponent(PersonConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
