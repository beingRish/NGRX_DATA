import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
  
  post: Post | any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }


  ngOnInit(): void {

    const id = this.route.snapshot.params['id']
    if(!id){
      return
    }

    this.postService.entities$.subscribe(posts => {
      this.post = posts.find(post => post.id === id);
    })
  }

  onBack() {
    this.router.navigate(['/posts']);
  }


}
