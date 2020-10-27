/* eslint-disable no-undef */
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import Domain from '../../../domain';
import Application from '../../../application';
import controllers from '../controllers';
import Database from './fakes/database';
import idGenerator from './fakes/id-generator';
import logger from './fakes/logger';
import eventBus from './fakes/event-bus';

const database = new Database({ entities: [] });
const validator = new Validator();
const domain = new Domain();
const infrastructure = { database, idGenerator, eventBus, logger, validator };
const application = new Application({ domain, infrastructure });
describe('Testing developer commands api controllers', () => {
	test('commitEvent', async () => {
		const commitEvent = controllers.commitEvent({ infrastructure, application });
		const res = await commitEvent({
			params: {
				type: 'testCreated',
				aggregate: {
					id: 1,
					type: 'test',
				},
				meta: {
					userId: 1,
				},
				payload: {
					name: 'test-name',
				},
			},
		});
		expect(res.status).toBe('success');
	});
});
