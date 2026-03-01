import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ResultDialogData {
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.css',
})
export class ResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
  ) {}

  onOk(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get iconName(): string {
    if (this.data.type === 'success') return 'check_circle';
    if (this.data.type === 'error') return 'error';
    return 'help';
  }

  get iconClass(): string {
    if (this.data.type === 'success') return 'icon-success';
    if (this.data.type === 'error') return 'icon-error';
    return 'icon-confirm';
  }
}
