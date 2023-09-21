import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Entry } from "./models";

@Injectable()
export class PostService {

    constructor(private http: HttpClient) { }

    postEntry(entry: Entry): Promise<Entry> {

        const form = new FormData()
        form.set("username", entry.username)
        form.set("restaurant", entry.restaurant)

        return firstValueFrom(
            this.http.post<Entry>('/entry', form)
        )
        
    }

}