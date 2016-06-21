import {Component, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {WineQuery} from '../../model/wine-query';
import {
	FormGroup, FormBuilder, FORM_DIRECTIVES, FormGroupDirective, FormControlName,
	FormControl
} from '@angular/forms';
import {isBlank, isPresent} from '@angular/core/src/facade/lang';
import {PaperMenuValueAccessor} from '../wine-view/paper-listbox-accessor';
import {FilterChipComponent} from './filter-chip.component';

@Component({
	selector: 'wine-filter',
	template: require('./wine-filter.template.html'),
	styles: [require('./wine-filter.styles.css')],
	directives: [PaperMenuValueAccessor, FORM_DIRECTIVES, FormGroupDirective, FormControlName, FilterChipComponent]
})
export class WineFilterComponent {

	protected model: FormGroup;
	@ViewChild('dialog') protected dialog: ElementRef;

	protected queryFields: Array<{key: string; label: string, value: string}> = [];
	private _query: WineQuery;

	@Output() onChanged = new EventEmitter<WineQuery>();

	constructor(private _formBuilder: FormBuilder) {
		this.model = this._formBuilder.group({
			name: [null],
			country: [null],
			type: [null],
			year: [null]
		});
	}

	@Input() set query(filter: WineQuery) {
		this._query = filter;
		this.queryFields = this.updateQueryFields();
		this._updateModel();
	}

	public open(): void {
		this._updateModel();
		this.dialog.nativeElement.open();
	}

	protected updateQueryFields(): Array<{key: string; label: string, value: string}> {
		if (isBlank(this._query)) {
			return [];
		}
		return Object.keys(this._query).filter((key: string) => isPresent(this._query[key])).map((key: string) => {
			return {
				key: key,
				label: key,
				value: this._query[key]
			};
		});
	}

	protected onClose(event: any) {
		if (event.detail.confirmed && this.model.dirty) {
			this.onChanged.emit(Object.keys(this.model.controls).map((name) => {
				return {
					[name]: this.model.controls[name].value
				};
			}).reduce<WineQuery>((first: WineQuery, second: WineQuery) => Object.assign(first, second), <WineQuery>{}));
		}
	}

	protected onDeleteCriteria(key: string) {
		this.onChanged.emit(Object.keys(this.model.controls).filter(name => name !== key).map((name) => {
			return {
				[name]: this.model.controls[name].value
			};
		}).reduce<WineQuery>((first: WineQuery, second: WineQuery) => Object.assign(first, second), <WineQuery>{}));
	}

	private _updateModel() {
		let filter = this._query;
		if (isBlank(this._query)) {
			filter = <WineQuery>{};
			return;
		}

		Object.keys(this.model.controls).forEach((name) => {
			let control: FormControl = <FormControl>this.model.controls[name];
			control.updateValue(filter[name], {onlySelf: true, emitEvent: false, emitModelToViewChange: true});
			control.setErrors(null);
		});
	}
}
