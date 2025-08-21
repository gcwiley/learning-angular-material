import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class FooterComponent {
  version = VERSION.full;
  year = new Date().getFullYear();
}
