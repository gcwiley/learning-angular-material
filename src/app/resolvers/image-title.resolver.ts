import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

// import image service
import { ImageService } from '../services/image.service';

export const imageTitleResolver: ResolveFn<string> = (route) => {
    const imageService = inject(ImageService);
    const id = route.paramMap.get('id');

    if (!id) {
        return of('Image Details');
    }

    // assumes getImageById returns an observable with a 'title' property
    return imageService.getImageById(id).pipe(
        map(image => image ? `${image.title} | Portfolio` : 'Image Details'),
        // fallback in case of error
        catchError(() => of('Image Details'))
    )
}