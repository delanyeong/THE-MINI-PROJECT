import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LotDraw, DrawResponse } from "./models";

@Injectable()
export class DrawLotService {

    constructor(private http: HttpClient) { }

    drawLot(lotDraw: LotDraw): Promise<DrawResponse> {
        
        const form = new FormData() 
        form.set("date", lotDraw.date)
		form.set("meal", lotDraw.meal)
        const longString = lotDraw.lots.map(item => `${item.name}-${item.restaurant}`).join(',');
		form.set("lots", longString);

        form.forEach((value, key) => {
            console.info(`${key}: ${value}`);
        });

        // returns promise
        return firstValueFrom(
			this.http.post<DrawResponse>('/api/draw', form)
		)

    }

}