
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Component, EventEmitter, Output, signal, ViewChild} from '@angular/core';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {BehaviorSubject} from "rxjs";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {BarcodeFormat} from "@zxing/browser";
import {FormatsDialogComponent} from "./formats-dialog/formats-dialog.component";
import {AppInfoDialogComponent} from "./app-info-dialog/app-info-dialog.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ZXingScannerModule, FormsModule, MatFormField, MatSelect, MatOption, MatIconButton, MatIcon, MatMenu, MatSelectionList, MatListOption, MatDivider, MatMenuItem, MatMenuTrigger],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('scanner') scanner!: ZXingScannerComponent;
  @Output() tagReaded = new EventEmitter<string>();


  availableDevices!: MediaDeviceInfo[];
  deviceCurrent!: MediaDeviceInfo;
  deviceSelected!: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices!: boolean;
  hasPermission!: boolean;

  qrResultString!: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(private readonly _dialog: MatDialog) { }

  clearResult(): void {
    // @ts-ignore
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    // @ts-ignore
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => {
        if (x) {
          this.formatsEnabled = x;
        }
      });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}

