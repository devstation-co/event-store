import Base from '@clean-framework/application';
import Commands from './commands.micromodule';
import Queries from './queries.micromodule';

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
				{
					name: 'queries',
					application: Queries,
				},
			],
		});
	}
}
