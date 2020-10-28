/* eslint-disable no-undef */
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import Application from '../../../application';
import controllers from '../controllers';
import logger from './fakes/logger';
import commandBus from './fakes/command-bus';

require('dotenv').config();

const validator = new Validator();
const infrastructure = { commandBus, logger, validator };
const application = new Application({ infrastructure });
describe('Testing event store http interface controllers', () => {
	test('commitEvent', async () => {
		const commitEvent = controllers.commitEvent({ infrastructure, application });
		const res = await commitEvent({
			request: {
				params: {
					token: '1234567',
					event: {
						type: 'testCreated',
						aggregate: { id: '1', type: 'test' },
						timestamp: new Date(),
						meta: { userId: '1' },
						payload: { name: 'test-name' },
					},
				},
			},
		});
		expect(res.status).toBe('success');
	});

	test('getEvents', async () => {
		const getEvents = controllers.getEvents({ infrastructure, application });
		const res = await getEvents({
			request: {
				params: {
					token: '1234567',
				},
			},
		});
		expect(res.status).toBe('success');
	});
});
