import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let message: string;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
    message = 'Message';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    // given
    const spy: jasmine.Spy = spyOn(service, 'add');

    // when
    service.add(message);

    // then
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should remove all messages', () => {
    // given
    service.add(message);

    // when
    service.clear();

    // then
    expect(service.isEmpty()).toBeTruthy();
  });

  it('should not be empty after adding message', () => {
    // given
    service.add(message);

    // when then
    expect(service.isEmpty()).toBeFalsy();
  });

  it('should return a message', () => {
    // given
    service.add(message);

    // when
    let messages: string[] | undefined;
    service
      .getMessages()
      .subscribe((messages2: string[]) => (messages = messages2));

    // then
    expect(messages).toEqual([message]);
  });
});
