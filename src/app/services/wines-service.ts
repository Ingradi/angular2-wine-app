import {Injectable, OpaqueToken, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {WineQuery} from '../model/wine-query';
import {Observable} from 'rxjs/Rx';
import {Wine} from '../model/wine';
import {isBlank, isPresent} from '@angular/core/src/facade/lang';

export const WINES_API_URL = new OpaqueToken('WinesService/API_URL');

@Injectable()
export class WinesService {

	constructor(@Inject(WINES_API_URL) private _apiUrl: string, private _http: Http) {}

	searchWines(query?: WineQuery): Observable<Wine[]> {
		let queryString = isBlank(query) ? '' : '?' + Object.keys(query)
			.filter((key) => isPresent(query[key]))
			.map((key) => `${key}=${query[key]}`)
			.join('&');
		return this._http.get(`${this._apiUrl}${queryString}`)
			.map(res => res.json());
	}

	saveWine(wine: Wine): Observable<Wine> {
		let apiCall = this._http.post(`${this._apiUrl}`, wine);
		if (isPresent(wine.id)) {
			apiCall = this._http.put(`${this._apiUrl}/${wine.id}`, wine);
		}
		return apiCall
			.map(res => res.json());
	}

	deleteWine(wine: Wine): Observable<any> {
		return this._http.delete(`${this._apiUrl}/${wine.id}`)
			.map(res => res.json());
	}
}
