import Base from '@clean-framework/domain-repository';

export default class Repository extends Base {
	async getEvents() {
		const res = await this.db().find({
			collectionName: this.collectionName,
			filter: {},
		});
		return res;
	}

	async getEvent({ eventId }) {
		const res = await this.db().findById({
			collectionName: this.collectionName,
			id: eventId,
		});
		return res;
	}

	async getEventsByAggregateId({ aggregateId }) {
		const response = await this.db().find({
			collectionName: this.collectionName,
			filter: { 'aggregate.id': aggregateId },
		});
		return response;
	}

	async getEventsByAggregateType({ aggregateType }) {
		const response = await this.db().find({
			collectionName: this.collectionName,
			filter: { 'aggregate.type': aggregateType },
		});
		return response;
	}
}
