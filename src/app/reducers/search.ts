import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {WineQuery} from '../model/wine-query';
import {WineActions} from '../actions/wine-actions';
import '@ngrx/core/add/operator/select';

export interface SearchState {
	query: WineQuery,
	loading: boolean
}

const initialState: SearchState = <SearchState>{
	query: <WineQuery>{},
	loading: false
};

export default function(state: SearchState = initialState, action: Action): SearchState {
	switch (action.type) {
		case WineActions.SEARCH: {
			return {
				query: action.payload,
				loading: true
			};
		}
		case WineActions.SEARCH_COMPLETE: {
			return {
				query: state.query,
				loading: false
			};
		}
		default: {
			return state;
		}
	}
};

export function isLoading() {
	return (state$: Observable<SearchState>) => state$
		.select(s => s.loading);
}

export function getQuery() {
	return (state$: Observable<SearchState>) => state$
		.select(s => s.query);
}
