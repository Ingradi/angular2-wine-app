import {Action, combineReducers} from '@ngrx/store';
import {Wine} from '../model/wine';
import {Observable} from 'rxjs/Observable';
import {WineActions} from '../actions/wine-actions';
import '@ngrx/core/add/operator/select';

interface WineActionState {
	processing: boolean,
	errors: any
}

export interface WinesState {
	list: Wine[],
	selected: Wine,
	actionState: WineActionState
}

let initialActionState: WineActionState = <WineActionState>{
	processing: false
};

let actionStateReducer = (state: WineActionState = initialActionState, action: Action): WineActionState => {
	switch (action.type) {
		case WineActions.DELETE_WINE:
		case WineActions.SAVE_WINE: {
			return {
				errors: null,
				processing: true
			};
		}
		case WineActions.DELETE_WINE_COMPLETE:
		case WineActions.SAVE_WINE_COMPLETE: {
			return {
				errors: null,
				processing: false
			};
		}
		case WineActions.DELETE_WINE_ERROR:
		case WineActions.SAVE_WINE_ERROR: {
			return {
				errors: action.payload,
				processing: false
			};
		}
		default: {
			return state;
		}
	}
};

let winesListReducer = (state: Wine[] = [], action: Action): Wine[] => {
	switch (action.type) {
		case WineActions.SEARCH_COMPLETE: {
			return action.payload;
		}
		case WineActions.DELETE_WINE_COMPLETE: {
			let deletedWine = action.payload;
			if (state.some(wine => wine.id === deletedWine.id)) {
				state.splice(state.findIndex(wine => wine.id === deletedWine.id), 1);
			}
			return state;
		}
		default: {
			return state;
		}
	}
};

let selectedWineReducer = (state: Wine = null, action: Action): Wine => {
	switch (action.type) {
		case WineActions.SELECT_WINE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
};

export default combineReducers({
	list: winesListReducer,
	selected: selectedWineReducer,
	actionState: actionStateReducer
});

export function getWines() {
	return (state$: Observable<WinesState>) => state$
		.select(s => s.list);
}

export function getSelectedWine() {
	return (state$: Observable<WinesState>) => state$
		.select(s => s.selected);
}

export function isProcessing() {
	return (state$: Observable<WinesState>) => state$
		.select(s => s.actionState.processing);
}

export function getErrors() {
	return (state$: Observable<WinesState>) => state$
		.select(s => s.actionState.errors);
}
