import Base from '@clean-framework/queries-interface';
import queries from './queries';
import controllers from './controllers';

export default class CommandsApi extends Base {
	constructor({ application, infrastructure }) {
		super({
			namespace: 'eventstore.queries',
			queries,
			controllers,
			application,
			infrastructure,
		});
	}
}
