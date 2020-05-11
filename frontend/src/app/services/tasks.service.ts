import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000/api'

  constructor(
      private httpClient: HttpClient
  ) { }

  getTasks() {
    return this.httpClient.get<any>(this.URL + '/tasks')
  }

  getPrivateTasks() {
    return this.httpClient.get<any>(this.URL + '/private-tasks')
  }
}
