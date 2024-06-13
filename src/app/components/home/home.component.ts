import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FileServiceService } from '../../services/file-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: any[] = [];
  showOverlay: boolean = false;
  imageRows: any[][] = [];
  constructor(private authService: AuthService, private fileService: FileServiceService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  navigateToUpload() {
    this.router.navigate(['/upload']);
  }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.fileService.getImages().subscribe((res)=> {
      this.images = res.data;
      this.organizeImagesIntoRows();
    })
  }
  organizeImagesIntoRows(): void {
    const itemsPerRow = 3; // Adjust based on your layout requirements
    this.imageRows = [];
    for (let i = 0; i < this.images.length; i += itemsPerRow) {
      this.imageRows.push(this.images.slice(i, i + itemsPerRow));
    }
  }
  showPhotographerName(image: any): void {
    image.showOverlay = true;
  }

  hidePhotographerName(): void {
    this.images.forEach(image => image.showOverlay = false);
  }

  deleteImage(imageId: string){
    this.fileService.deleteImage(imageId)
    .subscribe(
      (data) => {
        // Refresh images after deletion
        this.loadImages();
      }
    );
  }
}
