import {WinesService, WINES_API_URL} from './wines-service';
import {WinesServiceMock} from './wines-service-mock';

export * from './wines-service';

let PROVIDERS = [];

if ('production' === ENV) {
	console.log('PROD1111');
	PROVIDERS = [
		{provide: WINES_API_URL, useValue: 'https://tresmo-wine-api.herokuapp.com/wines'},
		WinesService
	];
} else {
	console.log('DEV');
	PROVIDERS = [
		{provide: WINES_API_URL, useValue: 'http://localhost:8080/wines'},
		WinesService
		// {provide: WinesService, useClass: WinesServiceMock}
	];
}

export const APPLICATION_SERVICES = [
	...PROVIDERS
];
