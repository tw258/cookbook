import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from './models/image';
import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImageById(imageId: string): Observable<Image> {
    const url = `${environment.apiUrl}/images/${imageId}`;

    return this.http.get<Image>(url);
  }

  getImagesById(imageIds: string[]): Observable<Image[]> {
    const responses$: Observable<Image>[] = imageIds.map(id => this.getImageById(id));

    return forkJoin(responses$);
  }

  addImage(image: Image, recipe: Recipe): Observable<Image> {
    const url = `${environment.apiUrl}/images`;

    let params = new HttpParams();
    params = params.set('recipeId', recipe._id);

    return this.http.post<Image>(url, image, { params });
  }

  addImages(images: Image[], recipe: Recipe): Observable<Image[]> {
    const responses$: Observable<Image>[] = images.map(i => this.addImage(i, recipe));

    return forkJoin(responses$);
  }

  deleteImage(image: Image, recipe: Recipe): Observable<void> {
    const url = `${environment.apiUrl}/images/${image._id}`;

    let params = new HttpParams();
    params = params.set('recipeId', recipe._id);

    return this.http.delete<void>(url, { params });
  }

  deleteImages(images: Image[], recipe: Recipe): Observable<void[]> {
    const responses$: Observable<void>[] = images.map(i => this.deleteImage(i, recipe));

    return forkJoin(responses$);
  }
}
