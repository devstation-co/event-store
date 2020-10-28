/* eslint-disable no-undef */
import logger from './fakes/logger';
import commandBus from './fakes/command-bus';
import useCases from '../use-cases';

const infrastructure = { logger, commandBus };
describe('Testing event store http microservice main use cases', () => {
	test('getEvents', async () => {
		const getEvents = useCases.getEvents({ infrastructure });
		const res = await getEvents({
			params: {
				token: '1234567',
			},
		});
		expect(res.status).toBe('success');
		expect(res.payload[0].type).toBe('testCreated');
	});

	test('commitEvent', async () => {
		const commitEvent = useCases.commitEvent({ infrastructure });
		const res = await commitEvent({
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
		});
		expect(res.status).toBe('success');
	});
});
