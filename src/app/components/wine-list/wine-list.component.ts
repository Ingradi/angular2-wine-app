import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Wine} from '../../model/wine';
import {isBlank} from '@angular/core/src/facade/lang';

@Component({
	selector: 'wine-list',
	template: require('./wine-list.template.html'),
	styles: [require('./wine-list.styles.css')]
})
export class WineListComponent {

	@Input() wines: Wine[];

	@Output() onSelected = new EventEmitter<Wine>();
	@Output() onDeleted = new EventEmitter<Wine>();

	protected hasNoDescription(wine: Wine): boolean {
		return isBlank(wine.description) || wine.description.length === 0;
	}
}
