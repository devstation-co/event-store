import Database from '@devstation-co/database.fake.micromodule';
import logger from '@devstation-co/logger.fake.micromodule';
import Domain from '../../../domain';
import Application from '../../../application';
import controllers from '../controllers';

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
const domain = new Domain();
const infrastructure = { database, logger };
const application = new Application({ domain, infrastructure });
describe('Testing developer queries api controllers', () => {
	test('getDevelopers', async () => {
		const getDevelopers = controllers.getDevelopers({ application, infrastructure });
		const res = await getDevelopers();
		expect(res[0].id).toBe(developer.id);
		expect(res[0].firstName).toBe(developer.firstName);
		expect(res[0].lastName).toBe(developer.lastName);
		expect(res[0].primaryEmailAddress).toBe(developer.primaryEmailAddress);
		expect(res[0].phoneNumbers).toEqual(expect.arrayContaining(developer.phoneNumbers));
		expect(res[0].emailAddresses).toEqual(expect.arrayContaining(developer.emailAddresses));
		expect(res[0].active).toBe(developer.active);
	});
});
