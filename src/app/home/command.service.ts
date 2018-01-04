import { Injectable } from '@angular/core';
import { CustomHeaderService } from '../shared/custom-header.service';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { endpoints } from '../shared/endpoints';

@Injectable()

export class CommandService {
    urlSearchParams: URLSearchParams;
    customHeaders: CustomHeaderService;
    private _commandAPIUrl: string = '';

    constructor(private http: Http) {       
        this._commandAPIUrl = endpoints.apiEndpoint + '/Commands/';
        this.customHeaders = new CustomHeaderService();
    }

     getProcessedResult(temperature : String, parsedCmds : number[]): Observable<Response> {
        this.urlSearchParams = new URLSearchParams();
        this.urlSearchParams.set('temperature', temperature.toString());
        for (let cmd of parsedCmds) {
            this.urlSearchParams.append('cmds', cmd+'');
        }
        this.customHeaders.options.search = this.urlSearchParams;

        return this.http.get(this._commandAPIUrl + 'GetProcessedResult/', this.customHeaders.options)
            .map(res => res)
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
