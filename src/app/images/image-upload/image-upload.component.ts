import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// image service
import { ImageService } from '../../services/image.service';

@Component({
   standalone: true,
   selector: 'app-image-upload',
   templateUrl: './image-upload.component.html',
   styleUrls: ['./image-upload.component.scss'],
   imports: [ReactiveFormsModule, FormsModule],
})
export class ImageUploadComponent {
   titleValue = '';

   selectedFile: File | null = null;

   constructor(private imageService: ImageService, private router: Router) {}

   onFileSelect(): void {
      // this.selectedFile = event.target.files[0];
   }

   onClickUpload(): void {
      if (this.selectedFile) {
         const formData = new FormData();

         formData.append('title', this.titleValue);
         formData.append('file', this.selectedFile);

         this.imageService.uploadImage(formData).subscribe(() => this.router.navigateByUrl('/'));
      }
   }
}
