import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.html',
  styleUrl: './image-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ImageForm {}
