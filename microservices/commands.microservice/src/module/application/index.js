import Base from '@devstation-co/application';
import Commands from './commands';

export default class Application extends Base {
	constructor({ infrastructure, domain }) {
		super({
			infrastructure,
			domain,
			applications: [
				{
					name: 'commands',
					application: Commands,
				},
			],
		});
	}
}
