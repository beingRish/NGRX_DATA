import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsResolver } from "../post.resolver";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { PostsDataService } from "../posts-data.service";
import { Post } from "../models/post.model";

const routes: Routes = [

    {
        path: '',
        component: PostsListComponent,
        resolve: {
            posts: PostsResolver
        }
    },
    {
        path: 'add',
        component: AddPostComponent
    },
    {
        path: 'edit/:id',
        component: EditPostComponent,
        resolve: {
            posts: PostsResolver
        }
    },
    {
        path: 'details/:id',
        component: SinglePostComponent,
        resolve: {
            posts: PostsResolver
        }
    },
]

const entityMetadata: EntityMetadataMap = {
    Post: {
        sortComparer: sortByName,
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: false
        }
    },
};

function sortByName(a: Post, b: Post): number{
    let comapre = a.title.localeCompare(b.title)
    if(comapre > 0) return -1;
    if(comapre < 0) return 1;
    return comapre; 
}

@NgModule({
    declarations: [
        PostsListComponent,
        SinglePostComponent,
        EditPostComponent,
        AddPostComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [PostsDataService, PostsResolver]
})

export class PostsModule {
    constructor(
        eds: EntityDefinitionService,
        entityDataService: EntityDataService,
        PostsDataService: PostsDataService
    ) {
        eds.registerMetadataMap(entityMetadata)
        entityDataService.registerService('Post', PostsDataService)
    }
}