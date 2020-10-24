import Base from '@clean-framework/interface';
import Commands from './commands.micromodule';
import Queries from './queries.micromodule';

export default class Interface extends Base {
	constructor({ application, infrastructure }) {
		super({
			interfaces: [
				{
					name: 'commands',
					settings: {
						application,
						infrastructure,
					},
					interface: Commands,
				},
				{
					name: 'queries',
					settings: {
						application,
						infrastructure,
					},
					interface: Queries,
				},
			],
		});
	}
}
