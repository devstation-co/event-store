/* eslint-disable no-undef */
import EventStore from './fakes/event-store';
import idGenerator from './fakes/id-generator';
import logger from './fakes/logger';
import Domain from '../../../domain';
import Application from '../../../application';
import controllers from '../controllers';

const eventstore = new EventStore({ events: [] });
const domain = new Domain();
const infrastructure = { eventstore, idGenerator, logger };
const application = new Application({ domain, infrastructure });
describe('Testing developer commands api controllers', () => {
	test('commitEvent', async () => {
		const commitEvent = controllers.commitEvent({ infrastructure, application });
		const res = await commitEvent({
			params: {
				event: {},
			},
		});
		expect(res.type).toBe('eventCommited');
	});
});
