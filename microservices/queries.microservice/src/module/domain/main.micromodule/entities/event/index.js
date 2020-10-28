import Base from '@clean-framework/domain-entity';
import Repository from './repository';

export default class Event extends Base {
	constructor({ database }) {
		super({
			type: 'event',
			database,
			entityEvents: {},
			Repository,
		});
	}
}
