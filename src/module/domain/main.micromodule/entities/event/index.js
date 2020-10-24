import Base from '@clean-framework/domain-entity';
import Repository from './repository';
import entityEvents from './events';

export default class Event extends Base {
	constructor({ id, database }) {
		super({
			id,
			type: 'event',
			database,
			entityEvents,
			Repository,
		});
	}
}
