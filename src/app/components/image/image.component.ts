import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileServiceService } from '../../services/file-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {
  imageForm!: FormGroup;
  selectedFile!: File;
  tags: string[] = [];
  constructor(private formBuilder: FormBuilder, private fileService: FileServiceService, private router: Router) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      tags: [[]],
      photographer_name:['']
      // imageFile: ['', Validators.required]
    });
  }
  addTag(tag: string): void {
    if (tag.trim() && !this.tags.includes(tag.trim())) {
      this.tags.push(tag.trim());
    }
  }
  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  // Convenience getter for easy access to form fields
  get f() { return this.imageForm.controls; }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    if (inputElement.files && inputElement.files.length > 0) {
      var blob = inputElement.files[0].slice(0, inputElement.files[0].size, 'image/png'); 

      const file = inputElement.files[0];
      this.selectedFile = file;
    }
  }
  

  onSubmit() {
    if (this.imageForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('title', this.imageForm.value.title);
    formData.append('photographer_name', this.imageForm.value.photographer_name)
    formData.append('description', this.imageForm.value.description);
    formData.append('file', this.selectedFile);
    this.tags.forEach(tag => {
      formData.append('tags[]', tag);
    });
    this.fileService.uploadFile(formData).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      })
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}