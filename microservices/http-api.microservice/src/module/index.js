import Base from '@devstation-co/module';
import Infrastructure from './infrastructure';
import Application from './application';
import Interface from './interface';

export default class AuthenticationHttpApiModule extends Base {
	constructor({ infrastructure }) {
		super({
			settings: {
				infrastructure,
			},
			layers: {
				Infrastructure,
				Application,
				Interface,
			},
		});
	}
}
