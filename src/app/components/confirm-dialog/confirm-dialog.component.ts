import {Component, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
@Component({
	'selector': 'wine-confirm-dialog',
	template: require('./confirm-dialog.template.html')
})
export class ConfirmDialogComponent {
	@Input() title: string;
	@Input() message: string;

	@ViewChild('dialog') dialog: ElementRef;

	private _subject: Subject<boolean>;

	public open(message?: string): Observable<any> {
		if (message && message.length > 0) {
			this.message = message;
		}
		this.dialog.nativeElement.open();

		if (this._subject) {
			this._subject.complete();
		}
		this._subject = new Subject<boolean>();
		return this._subject.asObservable();
	}

	protected onClose(event: any) {
		this._subject.next(event.detail.confirmed);
		this._subject.complete();
		this._subject = null;
	}
}
