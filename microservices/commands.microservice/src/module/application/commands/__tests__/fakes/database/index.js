/* eslint-disable class-methods-use-this */
export default class EventStore {
	constructor({ entities }) {
		this.entities = entities;
	}

	async findById({ collectionName, id }) {
		if (!collectionName) throw new Error('CollectioName undefined');
		if (!id) throw new Error('id undefined');
		return this.entities.find((e) => e.id === id);
	}

	async find({ collectionName, filter }) {
		if (!collectionName) throw new Error('CollectioName undefined');
		if (!filter) throw new Error('filter undefined');
		return this.entities;
	}

	async insert({ collectionName, entity }) {
		if (!collectionName) throw new Error('CollectioName undefined');
		if (!entity) throw new Error('entity undefined');
		this.entities.push(entity);
		return true;
	}

	async updateOne({ collectionName, filter, update }) {
		if (!collectionName) throw new Error('CollectioName undefined');
		if (!filter) throw new Error('filter undefined');
		if (!update) throw new Error('update undefined');
		this.entities = this.entities.map((e) => {
			if (e.id === filter.id) {
				return update;
			}
			return e;
		});
		return update;
	}
}
