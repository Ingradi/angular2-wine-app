import {Injectable} from '@angular/core';
import {AppState} from '../reducers';
import {StateUpdates, Effect, toPayload, StateUpdate} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {WineQuery} from '../model/wine-query';
import {Wine} from '../model/wine';
import {WineActions} from '../actions/wine-actions';
import {WinesService} from '../services/wines-service';

@Injectable()
export class WineEffects {
	constructor(
		private _updates$: StateUpdates<AppState>,
		private _wineActions: WineActions,
		private _wineService: WinesService
	) { }

	@Effect() loadWinesOnInit$ = Observable.of(this._wineActions.search());

	@Effect() search$ = this._updates$
		.whenAction(WineActions.SEARCH)
		.map<WineQuery>(toPayload)
		.switchMap((query: WineQuery) => this._wineService.searchWines(query))
		.map(wines => this._wineActions.searchComplete(wines))
		.catch(() => Observable.of(this._wineActions.searchComplete([])));

	@Effect() save$ = this._updates$
		.whenAction(WineActions.SAVE_WINE)
		.map<{wine: Wine; query: WineQuery}>((update: StateUpdate<AppState>) => {
			return {
				wine: update.action.payload,
				query: update.state.search.query
			};
		})
		.switchMap((data: {wine: Wine; query: WineQuery}) => this._wineService.saveWine(data.wine)
			.switchMap((wine: Wine) => Observable.of(this._wineActions.saveWineComplete(wine))
				.concat(Observable.of(this._wineActions.search(data.query))))
			.catch(error => Observable.of(this._wineActions.saveWineError(error)))
		);

	@Effect() delete$ = this._updates$
		.whenAction(WineActions.DELETE_WINE)
		.map<Wine>(toPayload)
		.switchMap((wine: Wine) => this._wineService.deleteWine(wine)
			.map(() => this._wineActions.deleteWineComplete(wine)))
		.catch(error => Observable.of(this._wineActions.deleteWineError(error)));
}
