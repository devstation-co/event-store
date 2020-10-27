import Database from '@devstation-co/database.fake.micromodule';
import logger from '@devstation-co/logger.fake.micromodule';
import Domain from '../../../domain';
import useCases from '../use-cases';

const domain = new Domain();
const developer = {
	id: 1,
	firstName: 'oualid',
	lastName: 'sellal',
	phoneNumbers: ['0655446633'],
	emailAddresses: ['oualid.sellal@gmail.com'],
	primaryEmailAddress: 'oualid.sellal@gmail.com',
	active: true,
};
const database = new Database({ entities: [developer] });
const infrastructure = { database, logger };
describe('Testing developer queries api use cases', () => {
	test('getAggregateEvents', async () => {
		const getAggregateEvents = useCases.getAggregateEvents({ domain, infrastructure });
		const res = await getAggregateEvents();
		expect(res[0].id).toBe(developer.id);
	});
	test('getAllEvents', async () => {
		const getAggregateEvents = useCases.getAggregateEvents({ domain, infrastructure });
		const res = await getAggregateEvents();
		expect(res[0].id).toBe(developer.id);
	});
});
