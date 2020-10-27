import Base from '@clean-framework/domain-entity';
import Repository from '@clean-framework/domain-repository';

export default class Event extends Base {
	constructor({ database }) {
		super({
			type: 'event',
			database,
			entityEvents: {},
			Repository,
		});
	}

	async create({ event }) {
		const newEvent = { id: this.getId(), ...event };
		if (!event.type) throw new Error('Event type undefined');
		if (!event.aggregate) throw new Error('Aggregate undefined');
		if (!event.aggregate.id) throw new Error('Aggregate id undefined');
		if (!event.aggregate.type) throw new Error('Aggregate type undefined');
		if (!event.timestamp) newEvent.timestamp = new Date();
		if (!event.meta) newEvent.meta = {};
		if (!event.payload) newEvent.payload = {};
		await this.repository.insert({ state: newEvent });
		return { status: 'success', timestamp: new Date(), payload: newEvent };
	}
}
