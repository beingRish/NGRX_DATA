import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {

  postForm!: FormGroup;
  post!: Post;
  id!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.id = this.route.snapshot.params['id']
    if(!this.id){
      return
    }
    this.postService.entities$.subscribe(posts => {
      const post = posts.find(post => post.id === this.id);
      if(post){
        this.post = post
        this.postForm.patchValue({
          title: post?.title,
          description: post?.description
        })
      }
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])

    })
  }

  showTitleErrors() {
    const descriptionForm = this.postForm?.get('title');
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
    const descriptionForm = this.postForm?.get('description');
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

  onUpdatePost() {

    if (!this.postForm.valid) {
      return;
    }

    if (!this.post || !this.post.id) {
      console.error('Post or post ID is missing.');
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    this.postService.update(post);

    this.router.navigate(['/posts']);
  }

  onBack() {
    this.router.navigate(['/posts']);
  }

}
