import {Component, Input, VERSION, ChangeDetectionStrategy} from '@angular/core';
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatLine
  ]
})
export class AppInfoComponent {

  ngVersion = VERSION.full;

  @Input()  hasDevices!: boolean;

  @Input()
  hasPermission!: boolean;

  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    // @ts-ignore
    return states['' + state];
  }
}
