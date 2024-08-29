import {Component} from '@angular/core';
// import material modules
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-bottom-sheet-overview',
  templateUrl: 'bottom-sheet-overview.component.html',
  standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule],
})
export class BottomSheetOverviewComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewSheetComponent);
  }
}

@Component({
  selector: 'app-bottom-sheet-overview-sheet',
  templateUrl: 'bottom-sheet-overview-sheet.html',
})
export class BottomSheetOverviewSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
