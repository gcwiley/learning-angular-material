import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// image service
import { ImageService } from '../../services/image.service';

@Component({
  standalone: true,
  selector: 'app-image-upload',
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormsModule],
})
export class ImageUpload {
  titleValue = '';
  selectedFile: File | null = null;

  // inject dependencies
  private imageService = inject(ImageService);
  private router = inject(Router);

  public onFileSelect(): void {
    this.selectedFile = event.target.files[0];
  }

  public onClickUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('title', this.titleValue);
      formData.append('file', this.selectedFile);

      this.imageService.uploadImage(formData).subscribe(() => this.router.navigateByUrl('/'));
    }
  }
}
