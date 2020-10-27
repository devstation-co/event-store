import Base from '@clean-framework/application';
import Queries from './queries.micromodule';

export default class Application extends Base {
	constructor({ infrastructure, domain }) {
		super({
			infrastructure,
			domain,
			applications: [
				{
					name: 'queries',
					application: Queries,
				},
			],
		});
	}
}
