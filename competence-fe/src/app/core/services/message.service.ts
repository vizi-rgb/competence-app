import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: string[] = [];
  private messagesSubject$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(this.messages);

  add(message: string): void {
    this.messages.push(message);
    this.messagesSubject$.next(this.messages);
  }

  clear(): void {
    this.messages = [];
    this.messagesSubject$.next(this.messages);
  }

  isEmpty(): boolean {
    return this.messages.length === 0;
  }

  getMessages(): Observable<string[]> {
    return this.messagesSubject$.asObservable();
  }
}
