import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    TranslateModule,
    AsyncPipe,
    MatDrawerContainer,
    MatDrawer,
    MatIcon,
    MatBadge,
    MatIconButton,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider,
    MatTooltip,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  unreadMessages: number;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    public messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {
    this.unreadMessages = 0;
  }

  ngOnInit(): void {
    this.messageService
      .getMessages()
      .pipe(
        map((messages: string[]) => messages.length),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((count: number) => {
        this.unreadMessages = count;
        this.cd.detectChanges();
      });
  }
}
