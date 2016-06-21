import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Renderer, ElementRef, forwardRef, Provider, Directive, HostBinding} from '@angular/core';

export const PAPER_MENU_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => PaperMenuValueAccessor),
	multi: true};

@Directive({
	selector: 'paper-menu[formControlName],paper-menu[formControl],paper-menu[ngModel]',
	providers: [PAPER_MENU_VALUE_ACCESSOR],
	host: {
		'attr-for-selected': 'id'
	}
})
export class PaperMenuValueAccessor implements ControlValueAccessor {

	onChange = (_) => {};
	onTouched = () => {};

	constructor(private _renderer: Renderer, private _elementRef: ElementRef) {
		this._elementRef.nativeElement.addEventListener('iron-select', (e) => {
			this.onChange(e.detail.item.id);
		});
	}

	writeValue(value: any): void {
		if (value === this._elementRef.nativeElement.selected) {
			return;
		}
		if(this._elementRef.nativeElement.select) {
			this._elementRef.nativeElement.select((value) ? value : null);
		} else {
			this._elementRef.nativeElement.setAttribute("selected", value);
		}
	}

	registerOnChange(fn: () => any): void { this.onChange = fn; }
	registerOnTouched(fn: () => any): void { this.onTouched = fn; }
}
