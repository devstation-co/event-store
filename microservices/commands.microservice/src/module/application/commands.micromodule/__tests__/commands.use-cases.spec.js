/* eslint-disable no-undef */
import idGenerator from './fakes/id-generator';
import Database from './fakes/database';
import logger from './fakes/logger';
import eventBus from './fakes/event-bus';
import Domain from '../../../domain';
import useCases from '../use-cases';

const database = new Database({ entities: [] });
const domain = new Domain();
const infrastructure = { database, idGenerator, logger, eventBus };
describe('Testing event store commands interface use cases', () => {
	test('commitEvent', async () => {
		const commitEvent = useCases.commitEvent({ domain, infrastructure });
		const res = await commitEvent({
			params: {
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
			},
		});
		expect(res.status).toBe('success');
	});
});
