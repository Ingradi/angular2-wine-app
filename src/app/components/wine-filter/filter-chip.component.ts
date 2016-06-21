import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
	selector: 'wine-filter-chip',
	template: require('./filter-chip.template.html'),
	styles: [require('./filter-chip.styles.css')]
})
export class FilterChipComponent {
	@Input() label: string;
	@Input() value: string;

	@Output() onDelete = new EventEmitter<any>();
}
