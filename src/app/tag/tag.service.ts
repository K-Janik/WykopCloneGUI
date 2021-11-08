import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TagModel} from "./tag-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  createTag(tagModel: TagModel): Observable<TagModel> {
    return this.http.post<TagModel>('http://localhost:8080/api/tag', tagModel);
  }

  getAllTags(): Observable<Array<TagModel>> {
    return this.http.get<Array<TagModel>>('http://localhost:8080/api/tag');
  }
}
