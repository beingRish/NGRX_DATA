import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import {
    first,
    Observable,
    tap
} from "rxjs";

import { PostService } from "./posts/post.service";

@Injectable()

export class PostsResolver implements Resolve<boolean> {

    constructor(
        private PostService: PostService
    ) { }

    resolve(): boolean | Observable<boolean> | Promise<boolean> {
        return this.PostService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.PostService.getAll();
                }
            }),
            first()
        )
    }
}