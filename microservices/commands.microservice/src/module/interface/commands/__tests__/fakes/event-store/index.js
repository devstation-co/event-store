export default class EventStore {
	constructor({ events }) {
		this.events = events;
	}

	async commit({ event }) {
		this.events.push(event);
	}

	async getAggregateEvents({ aggregateId }) {
		return this.events.filter((a) => a.aggregate.id === aggregateId);
	}
}
