import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ResultDialogComponent,
  ResultDialogData,
} from '../components/result-dialog/result-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  success(title: string, message: string, confirmText: string = 'OK'): Promise<boolean> {
    return this.openDialog({
      type: 'success',
      title,
      message,
      confirmText,
      cancelText: 'Cancelar',
    });
  }

  error(title: string, message: string, confirmText: string = 'OK'): Promise<boolean> {
    return this.openDialog({
      type: 'error',
      title,
      message,
      confirmText,
      cancelText: 'Cancelar',
    });
  }

  custom(data: ResultDialogData): Promise<boolean> {
    return this.openDialog(data);
  }

  private openDialog(data: ResultDialogData): Promise<boolean> {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '400px',
      data,
      disableClose: false,
    });

    return dialogRef
      .afterClosed()
      .toPromise()
      .then((result) => result === true);
  }
}
