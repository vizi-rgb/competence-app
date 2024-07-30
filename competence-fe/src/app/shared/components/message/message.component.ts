import { Component } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  constructor(public messageService: MessageService) {}
}
