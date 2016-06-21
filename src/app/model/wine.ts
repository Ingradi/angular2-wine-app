
export type WineType = 'red' | 'rose' | 'white';

export interface Wine {
	id: number,
	name: string,
	year: number,
	country: string,
	description: string,
	type: WineType
}
