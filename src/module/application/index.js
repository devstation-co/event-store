import Base from '@devstation-co/application';
import CommandsApi from './commands-api.application.micromodule';
import QueriesApi from './queries-api.application.micromodule';

export default class Application extends Base {
	constructor({ infrastructure, domain }) {
		super({
			infrastructure,
			domain,
			applications: [
				{
					name: 'commands',
					application: CommandsApi,
				},
				{
					name: 'queries',
					application: QueriesApi,
				},
			],
		});
	}
}
