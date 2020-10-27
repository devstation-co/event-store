/* eslint-disable no-undef */
import Database from './fakes/database';
import Event from '../entities/event';

const database = new Database({ entities: [] });
const event = new Event({ database });
describe('Testing event entity', () => {
	beforeEach(async () => {
		event.setId({ id: 1 });
		await event.hydrate();
	});

	test('save', async () => {
		const eventToSave = {
			id: 1,
			type: 'eventCommited',
			timestamp: new Date(),
			aggregate: {
				id: 1,
				type: 'event',
			},
			meta: {
				userId: 1,
			},
			payload: {
				event: {},
			},
		};
		const res = await event.repository.save({ state: eventToSave });
		expect(res).toBeTruthy();
	});
});
