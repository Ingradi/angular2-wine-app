/*
 * Providers provided by Angular
 */
import {bootstrap} from '@angular/platform-browser-dynamic';
/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import {PLATFORM_PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {STORE_PROVIDERS} from './app/reducers';
import {EFFECTS_PROVIDERS} from './app/effects';
import {ACTIONS_PROVIDERS} from './app/actions';
import {Application} from './app/app';
import {APPLICATION_SERVICES} from './app/services/index';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main():Promise<any> {
	return bootstrap(Application, [
		...PLATFORM_PROVIDERS,
		...ENV_PROVIDERS,
		...STORE_PROVIDERS,
		...EFFECTS_PROVIDERS,
		...ACTIONS_PROVIDERS,
		...APPLICATION_SERVICES
	])
		.catch(err => console.error(err));

}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */
window.addEventListener('WebComponentsReady', (e) => {
	main();
});
