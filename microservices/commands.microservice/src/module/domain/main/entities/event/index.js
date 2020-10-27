import Base from '@clean-framework/domain-entity';
import Repository from '@clean-framework/domain-repository';

export default class Event extends Base {
	constructor({ id, database }) {
		super({
			type: 'event',
			id,
			database,
			entityEvents: {},
			Repository,
		});
	}
}
