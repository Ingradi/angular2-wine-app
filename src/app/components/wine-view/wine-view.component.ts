import {Component, Input, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import {Wine} from '../../model/wine';
import {
	FormBuilder, Validators, FormGroup, FormControlName, FormGroupDirective,
	FormControl, AbstractControl
} from '@angular/forms';
import {FORM_DIRECTIVES, Control} from '@angular/common';
import {isBlank, isPresent, NumberWrapper} from '@angular/core/src/facade/lang';
import {PaperMenuValueAccessor} from './paper-listbox-accessor';

@Component({
	selector: 'wine-view',
	template: require('./wine-view.template.html'),
	styles: [require('./wine-view.styles.css')],
	directives: [PaperMenuValueAccessor, FORM_DIRECTIVES, FormGroupDirective, FormControlName]
})
export class WineViewComponent {

	@Output() onSave = new EventEmitter<Wine>();
	@Output() onCancel = new EventEmitter<any>();

	protected model: FormGroup;
	@ViewChild('dialog') protected dialog: ElementRef;

	private _wine: Wine;

	constructor(private _formBuilder: FormBuilder) {
		this.model = this._formBuilder.group({
			name: [null, Validators.required],
			country: [null, Validators.required],
			type: [null, Validators.required],
			year: [null, Validators.compose([Validators.required, WineViewComponent.year])],
			description: [null]
		});
	}

	@Input() set wine(wine: Wine) {
		this._wine = wine;
		if (this.dialog.nativeElement.opened) {
			this._updateModel();
		}
	}

	public open(): void {
		this._updateModel();
		this.dialog.nativeElement.open();
	}

	protected get valid(): boolean {
		return this.model.valid;
	}

	protected get isNew(): boolean {
		return isBlank(this._wine) || isBlank(this._wine.id);
	}

	protected isInvalid(controlName: string): boolean {
		return this.model.controls[controlName].pristine ? false : this.model.controls[controlName].valid === false;
	}

	protected onClose(event: any) {
		if (event.detail.confirmed) {
			let wine: Wine = <Wine>{};
			if (isPresent(this._wine) && isPresent(this._wine.id)) {
				wine.id = this._wine.id;
			}
			this.onSave.emit(Object.keys(this.model.controls).map((name) => {
				let value = this.model.controls[name].value;
				if (name === 'year') {
					value = NumberWrapper.parseInt(value, 10);
				}
				return {
					[name]: value
				};
			}).reduce<Wine>((first: Wine, second: Wine) => Object.assign(first, second), wine));
		} else {
			this.onCancel.emit(true);
		}
	}

	private _updateModel() {
		let wine = this._wine;
		if (isBlank(this._wine)) {
			wine = <Wine>{};
			return;
		}

		Object.keys(this.model.controls).forEach((name) => {
			let control: FormControl = <FormControl>this.model.controls[name];
			control.setErrors(null);
			control.updateValue(wine[name], {onlySelf: true, emitEvent: false, emitModelToViewChange: true});
			// TODO: replace following lines after https://github.com/angular/angular/issues/4933 is fixed
			// Ugly hack to manually reset form, since no method is available for it
			control['_touched'] = false;
			control['_pristine'] = true;
		});
	}

	static year(control: AbstractControl): { [s: string]: boolean } {
		if(control && control.value) {
			let value: string = '' + control.value;
			if (!value.match('^[1-9][0-9]*$')) {
				return {year: true};
			}
		}
		return null;
	}
}
