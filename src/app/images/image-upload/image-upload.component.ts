import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import the image service
import { ImageService } from 'src/app/services/image.service';

@Component({
   selector: 'app-image-upload',
   templateUrl: './image-upload.component.html',
   styleUrls: ['./image-upload.component.scss'],
   standalone: true,
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
