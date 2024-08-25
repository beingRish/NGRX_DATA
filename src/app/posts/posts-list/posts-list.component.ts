import { Component, OnInit } from '@angular/core';
import { PostService } from '../post..service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit{

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll();
  }

}
