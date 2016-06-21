import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, getWines, getSelectedWine, getQuery, isLoading} from './reducers';
import {Observable} from 'rxjs/Rx';
import {Wine} from './model/wine';
import {WineActions} from './actions/wine-actions';
import {AsyncPipe} from '@angular/common';
import {WineListComponent} from './components/wine-list/wine-list.component';
import {WineViewComponent} from './components/wine-view/wine-view.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {WineFilterComponent} from './components/wine-filter/wine-filter.component';
import {WineQuery} from './model/wine-query';

@Component({
	selector: 'wine-app',
	template: require('./app.html'),
	styles: [require('./app.css')],
	host: {
		'class': 'flex'
	},
	pipes: [AsyncPipe],
	directives: [WineListComponent, WineViewComponent, ConfirmDialogComponent, WineFilterComponent],
	encapsulation: ViewEncapsulation.None
})
export class Application {
	protected wineList$: Observable<Wine[]>;
	protected selectedWine$: Observable<Wine>;
	protected query$: Observable<WineQuery>;
	protected loading$: Observable<boolean>;

	@ViewChild(WineViewComponent) view: WineViewComponent;
	@ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

	constructor(private _store: Store<AppState>, private _wineActions: WineActions) {
		this.wineList$ = this._store.let(getWines());
		this.selectedWine$ = this._store.let(getSelectedWine());
		this.query$ = this._store.let(getQuery());
		this.loading$ = this._store.let(isLoading());
	}

	selectWine(wine: Wine) {
		this._store.dispatch(this._wineActions.selectWine(wine));
		this.view.open();
	}

	deleteWine(wine: Wine) {
		this.confirmDialog.open(`Do you really want to delete wine with name ${wine.name}?`)
			.filter(isConfirmed => isConfirmed)
			.subscribe(() => {
				this._store.dispatch(this._wineActions.deleteWine(wine));
			});
	}

	addWine() {
		this._store.dispatch(this._wineActions.selectWine(<Wine>{}));
		this.view.open();
	}

	saveWine(wine: Wine) {
		this._store.dispatch(this._wineActions.saveWine(wine));
	}

	searchWine(query: WineQuery) {
		this._store.dispatch(this._wineActions.search(query));
	}
}
