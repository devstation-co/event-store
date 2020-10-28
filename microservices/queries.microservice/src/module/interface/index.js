import Base from '@clean-framework/interface';
import Queries from './queries.micromodule';

export default class Interface extends Base {
	constructor({ application, infrastructure }) {
		super({
			interfaces: [
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
