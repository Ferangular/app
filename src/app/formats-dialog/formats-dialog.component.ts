import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions} from '@angular/material/dialog';
import {MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import { BarcodeFormat } from '@zxing/library';
import { formatNames, formatsAvailable } from '../models/barcode-formats';
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-formats-dialog',
  standalone: true,
  templateUrl: './formats-dialog.component.html',
  imports: [
    MatSelectionList,
    MatListOption,
    MatDialogActions,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./formats-dialog.component.scss']
})
export class FormatsDialogComponent {

  formatsAvailable = formatsAvailable;

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = formatNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>) {
    this.formatsEnabled = data.formatsEnabled || [];
  }

  close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  // isEnabled(format: BarcodeFormat) {
  //   return this.formatsEnabled.find(x => x === format);
  // }
  isEnabled(format: BarcodeFormat){
    // @ts-ignore
    return this.formatsEnabled.find(x => x === format);
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(selected => selected.value);
  }
}
