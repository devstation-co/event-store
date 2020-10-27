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

	test('Apply eventCommited event', async () => {
		const eventToTest = {
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
		await developer.apply({ events: [eventToTest], save: true });
		const state = developer.getState();
		expect(state.id).toBe(event.aggregate.id);
		expect(state.timestamp).toBe(event.timestamp);
		expect(state.userId).toBe(event.meta.userId);
		expect(state.firstName).toBe(event.payload.firstName);
		expect(state.lastName).toBe(event.payload.lastName);
		expect(state.phoneNumbers).toEqual(expect.arrayContaining(event.payload.phoneNumbers));
		expect(state.emailAddresses).toEqual(
			expect.arrayContaining(event.payload.emailAddresses.map((e) => e.emailAddress)),
		);
		expect(state.active).toBeTruthy();
	});

	test('getDevelopers', async () => {
		const res = await developer.repository.getDevelopers();
		expect(res[0].id).toBe(1);
		expect(res[0].firstName).toBe('hamid');
		expect(res[0].lastName).toBe('sellal');
		expect(res[0].primaryEmailAddress).toBe('oualid.sellal@gmail.com');
		expect(res[0].phoneNumbers).toEqual(expect.arrayContaining(['0655446633']));
		expect(res[0].emailAddresses).toEqual(expect.arrayContaining(['oualid.sellal@gmail.com']));
		expect(res[0].active).toBeFalsy();
	});
});
