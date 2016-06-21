import {runEffects} from '@ngrx/effects';
import {WineEffects} from './wine-effects';

export const EFFECTS_PROVIDERS = [
	runEffects(WineEffects)
];
