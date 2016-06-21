import searchReducer, * as fromSearch from './search';
import winesReducer, * as fromWines from './wines';
import {combineReducers, provideStore} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {compose} from '@ngrx/core/compose';
import '@ngrx/core/add/operator/select';

export interface AppState {
	search: fromSearch.SearchState;
	wines: fromWines.WinesState;
}

let appStateReducer = combineReducers({
	search: searchReducer,
	wines: winesReducer
});

export function getSearchState() {
	return (state$: Observable<AppState>) => state$
		.select(s => s.search);
}

export function isLoading() {
	return compose(fromSearch.isLoading(), getSearchState());
}

export function getQuery() {
	return compose(fromSearch.getQuery(), getSearchState());
}

export function getWinesState() {
	return (state$: Observable<AppState>) => state$
		.select(s => s.wines);
}

export function getWines() {
	return compose(fromWines.getWines(), getWinesState());
}

export function getSelectedWine() {
	return compose(fromWines.getSelectedWine(), getWinesState());
}

export function isProcessing() {
	return compose(fromWines.isProcessing(), getWinesState());
}

export function getErrors() {
	return compose(fromWines.getErrors(), getWinesState());
}

export const STORE_PROVIDERS = [
	provideStore(appStateReducer)
];
