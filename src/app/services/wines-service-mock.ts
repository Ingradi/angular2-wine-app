import {Injectable} from '@angular/core';
import {WineQuery} from '../model/wine-query';
import {Observable} from 'rxjs/Rx';
import {Wine} from '../model/wine';
import {isBlank} from '@angular/core/src/facade/lang';

@Injectable()
export class WinesServiceMock {

	private _dummyWines = [{
			id: 1,
			name: 'Wine 1',
			year: 1999,
			country: 'Italy',
			type: 'red'
		}, {
			id: 2,
			name: 'Wine 2',
			year: 1999,
			country: 'France',
			type: 'white'
		}, {
			id: 3,
			name: 'Wine 3',
			year: 1999,
			country: 'USA',
			type: 'rose'
		}, {
			id: 4,
			name: 'Wine 4',
			year: 2000,
			country: 'Italy',
			type: 'red'
		}
	];
	private _nextId = 100;

	searchWines(query?: WineQuery): Observable<Wine[]> {
		return Observable.of(<Wine[]>this._dummyWines);
	}

	saveWine(wine: Wine): Observable<Wine> {
		if (isBlank(wine.id)) {
			let result = Object.assign({}, wine);
			result.id = this._nextId++;
			this._dummyWines.push(result);
			return Observable.of(result);
		}
		this._dummyWines = this._dummyWines
			.map(item => (item.id === wine.id) ? Object.assign({}, item, wine) : item);
		return Observable.of(<Wine>this._dummyWines.find((item: Wine) => item.id === wine.id));
	}

	deleteWine(wine: Wine): Observable<any> {
		this._dummyWines.splice(this._dummyWines.findIndex(item => item.id === wine.id), 1);
		return Observable.of({success: true});
	}
}
