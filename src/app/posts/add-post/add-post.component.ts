import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {

  postForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  showTitleErrors() {
    const descriptionForm = this.postForm.get('title');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.['required']) {
        return 'Title is required';
      }
      if (descriptionForm?.errors?.['minlength']) {
        return 'Title should be of minimum 6 characters length';
      }
    }
    return
  }


  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.['required']) {
        return 'Description is required';
      }
      if (descriptionForm?.errors?.['minlength']) {
        return 'Description should be of minimum 10 characters length';
      }
    }
    return
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };

    this.postService.add(post).subscribe(data => {
      this.router.navigate(['/posts']);
    });
  }

  onBack() {
    this.router.navigate(['/posts']);
  }

}
