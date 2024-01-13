import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  http = inject(HttpClient);
  util = inject(UtilService);
  private apiKey = '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';
  constructor() { }

  getApiResponse(prompt: string, type: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const requestBody = this.util.getRequestByType(type, prompt);

    return this.http.post<any>('https://api.openai.com/v1/chat/completions', requestBody, { headers });
  }
}
