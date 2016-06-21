import {WineType} from './wine';

export interface WineQuery {
	name: string
	year: number,
	country: string,
	type: WineType
}
