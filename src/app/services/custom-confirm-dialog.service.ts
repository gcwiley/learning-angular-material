import { Injectable, inject } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { ConfirmDialogService } from './confirm-dialog.service';

export enum CustomConfirmDialog {
  Delete,
  UnsavedWork,
}

@Injectable({
  providedIn: 'root',
})
export class CustomConfirmDialogService {
  // inject dependencies
  private confirm = inject(ConfirmDialogService);

  public openCustomConfirmDialog(type: CustomConfirmDialog): Observable<boolean> {
    const title = this.getTitle(type);
    const content = this.getContent(type);
    return this.open(title, content);
  }

  private getTitle(type: CustomConfirmDialog) {
    switch (type) {
      case CustomConfirmDialog.Delete:
        return 'fix-this!';
      case CustomConfirmDialog.UnsavedWork:
        return 'fix-this!';
      default:
        return 'fix-this!';
    }
  }

  private getContent(type: CustomConfirmDialog) {
    switch (type) {
      case CustomConfirmDialog.Delete:
        return 'Are you sure you want to delete this post?';
      case CustomConfirmDialog.UnsavedWork:
        return 'fix-this!';
      default:
        return 'fix-this!';
    }
  }

  private open(title: string, content: string): Observable<boolean> {
    return this.confirm.open(title, content).pipe(
      first(),
      map((res) => !!res)
    );
  }
}
