import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from '../../../core/services/message.service';
import { of } from 'rxjs';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', [
      'isEmpty',
      'getMessages',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        MessageComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MessageService,
          useValue: messageServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of unread messages in the badge', () => {
    // given
    const messages: string[] = ['Message'];
    messageServiceSpy.isEmpty.and.returnValue(false);
    messageServiceSpy.getMessages.and.returnValue(of(messages));
    fixture.detectChanges();
    const badgeElement =
      fixture.nativeElement.querySelector('.mat-badge-content');

    // when then
    expect(badgeElement.textContent).toBe('1');
  });

  it('should hide the badge when 0 unread messages', () => {
    // given
    messageServiceSpy.isEmpty.and.returnValue(true);
    messageServiceSpy.getMessages.and.returnValue(of([]));
    fixture.detectChanges();
    const badgeElement: HTMLElement =
      fixture.nativeElement.querySelector('.mat-badge-content');

    // when then
    expect(badgeElement.ariaHidden).toBeTruthy();
  });
});
