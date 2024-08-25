import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { PostsResolver } from './post.resolver';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'posts', 
    component: PostsListComponent, 
    resolve: {
      posts: PostsResolver
    }
  },
  {
    path: 'posts/add', 
    component: AddPostComponent
  },
  {
    path: 'posts/edit/:id', 
    component: EditPostComponent,
    resolve: {
      posts: PostsResolver
    }
  },
  {
    path: 'posts/details/:id', 
    component: SinglePostComponent,
    resolve: {
      posts: PostsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
