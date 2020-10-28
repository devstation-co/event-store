/* eslint-disable no-undef */
import Database from './fakes/database';
import Event from '../entities/event';

const database = new Database({ entities: [] });
const event = new Event({ database });
describe('Testing event entity', () => {
	beforeEach(async () => {
		event.setId({ id: 1 });
	});

	test('create', async () => {
		const eventToSave = {
			type: 'testCreated',
			aggregate: {
				id: '1',
				type: 'test',
			},
			meta: {
				userId: '1',
			},
			payload: {
				name: 'test-name',
			},
		};
		const res = await event.create({ event: eventToSave });
		expect(res.status).toBe('success');
	});
});
