import Base from '@clean-framework/commands-interface';
import commands from './commands';
import controllers from './controllers';

export default class CommandsApi extends Base {
	constructor({ application, infrastructure }) {
		super({
			namespace: 'eventstore.commands',
			version: 1,
			commands,
			controllers,
			application,
			infrastructure,
		});
	}
}
