import EventStore from '@devstation-co/event-store.fake.micromodule';
import idGenerator from '@devstation-co/id-generator.fake.micromodule';
import logger from '@devstation-co/logger.fake.micromodule';
import Domain from '../../../domain';
import Application from '../../../application';
import controllers from '../controllers';

const eventstore = new EventStore({ events: [] });
const domain = new Domain();
const infrastructure = { eventstore, idGenerator, logger };
const application = new Application({ domain, infrastructure });
describe('Testing developer commands api controllers', () => {
	test('createDeveloper', async () => {
		const createDeveloper = controllers.createDeveloper({ infrastructure, application });
		const res = await createDeveloper({
			params: {
				user: { id: 1 },
				firstName: 'oualid',
				lastName: 'sellal',
				emailAddresses: [{ emailAddress: 'oualid.sellal@gmail.com', primary: true }],
				phoneNumbers: ['0655443322'],
			},
		});
		expect(res.type).toBe('developerCreated');
	});

	test('updateDeveloperFirstName', async () => {
		const updateDeveloperFirstName = controllers.updateDeveloperFirstName({
			infrastructure,
			application,
		});
		const res = await updateDeveloperFirstName({
			params: {
				user: { id: 1 },
				firstName: 'oualid',
				developerId: 1,
			},
		});
		expect(res.type).toBe('developerFirstNameUpdated');
	});

	test('deleteDeveloper', async () => {
		const deleteDeveloper = controllers.deleteDeveloper({ infrastructure, application });
		const res = await deleteDeveloper({
			params: {
				user: { id: 1 },
				developerId: 1,
			},
		});
		expect(res.type).toBe('developerDeleted');
	});
});
