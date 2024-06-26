import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private apiUrl = 'https://imageplatform-backend.onrender.com'; // Your backend URL
  // private apiUrl = 'http://localhost:3000'; // Your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  uploadFile(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  // Example: Fetch all images
  getImages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fetchImages`);
  }
  //photographer name, pic name, tags of logged in user
  searchImages(keyword: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fetchImagesByTitle?keyword=${keyword}`);
  }
  // Example: Delete an image by ID
  deleteImage(imageId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${imageId}`);
  }
}
