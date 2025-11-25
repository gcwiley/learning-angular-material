import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class Footer {
  version = VERSION.full;
  year = new Date().getFullYear();
}
