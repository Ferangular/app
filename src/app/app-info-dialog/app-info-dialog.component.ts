import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {AppInfoComponent} from "../app-info/app-info.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  templateUrl: './app-info-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppInfoComponent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ]
})
export class AppInfoDialogComponent {

  hasDevices: boolean;
  hasPermission: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
  ) {
    this.hasDevices = data.hasDevices;
    this.hasPermission = data.hasPermission;
  }

}
