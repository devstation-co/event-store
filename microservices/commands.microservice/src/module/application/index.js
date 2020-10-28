import Base from '@clean-framework/application';
import Commands from './commands.micromodule';

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
