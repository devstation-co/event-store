import Base from '@clean-framework/commands-interface';
import commands from './commands';
import controllers from './controllers';

export default class Commands extends Base {
	constructor({ application, infrastructure }) {
		super({
			namespace: process.env.MICROSERVICE_NAME,
			commands,
			controllers,
			application,
			infrastructure,
		});
	}
}
