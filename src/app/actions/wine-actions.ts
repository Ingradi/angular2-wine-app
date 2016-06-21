import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Wine} from '../model/wine';
import {WineQuery} from '../model/wine-query';

@Injectable()
export class WineActions {
	static SEARCH = '@@@WineActions/SEARCH';
	search(query?: WineQuery): Action {
		return {
			type: WineActions.SEARCH,
			payload: query
		};
	}

	static SEARCH_COMPLETE = '@@@WineActions/SEARCH_COMPLETE';
	searchComplete(results: Wine[]): Action {
		return {
			type: WineActions.SEARCH_COMPLETE,
			payload: results
		};
	}

	static SELECT_WINE = '@@@WineActions/SELECT_WINE';
	selectWine(selected: Wine): Action {
		return {
			type: WineActions.SELECT_WINE,
			payload: selected
		};
	}

	static SAVE_WINE = '@@@WineActions/SAVE_WINE';
	saveWine(wine: Wine): Action {
		return {
			type: WineActions.SAVE_WINE,
			payload: wine
		};
	}

	static SAVE_WINE_COMPLETE = '@@@WineActions/SAVE_WINE_COMPLETE';
	saveWineComplete(saved: Wine): Action {
		return {
			type: WineActions.SAVE_WINE_COMPLETE,
			payload: saved
		};
	}

	static SAVE_WINE_ERROR = '@@@WineActions/SAVE_WINE_ERROR';
	saveWineError(error: any): Action {
		return {
			type: WineActions.SAVE_WINE_ERROR,
			payload: error
		};
	}

	static DELETE_WINE = '@@@WineActions/DELETE_WINE';
	deleteWine(wine: Wine): Action {
		return {
			type: WineActions.DELETE_WINE,
			payload: wine
		};
	}

	static DELETE_WINE_COMPLETE = '@@@WineActions/DELETE_WINE_COMPLETE';
	deleteWineComplete(deleted: Wine): Action {
		return {
			type: WineActions.DELETE_WINE_COMPLETE,
			payload: deleted
		};
	}

	static DELETE_WINE_ERROR = '@@@WineActions/DELETE_WINE_ERROR';
	deleteWineError(error: any): Action {
		return {
			type: WineActions.DELETE_WINE_ERROR,
			payload: error
		};
	}
}
