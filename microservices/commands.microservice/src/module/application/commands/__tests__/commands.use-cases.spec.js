import EventStore from './fakes/event-store.fake.micromodule';
import idGenerator from './fakes/id-generator.fake.micromodule';
import logger from './fakes/logger.fake.micromodule';
import Domain from '../../../domain';
import useCases from '../use-cases';

const domain = new Domain();
const eventstore = new EventStore({ events: [] });
const infrastructure = { eventstore, idGenerator, logger };
describe('Testing event store commands interface use cases', () => {
	test('commitEvent', async () => {
		const commitEvent = useCases.commitEvent({ domain, infrastructure });
		const res = await commitEvent({
			params: {
				user: { id: 1 },
				firstName: 'oualid',
				lastName: 'sellal',
				emailAddresses: [{ emailAddress: 'oualid.sellal@gmail.com', primary: true }],
				phoneNumbers: ['0655443322'],
			},
		});
		expect(res.type).toBe('eventCommited');
	});
});
