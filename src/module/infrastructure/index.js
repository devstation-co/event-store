import Base from '@clean-framework/infrastructure';
import CommandBus from '@devstation.co/command-bus.infrastructure.micromodule';
import EventBus from '@devstation.co/event-bus.infrastructure.micromodule';
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import Logger from '@devstation.co/logger.infrastructure.micromodule';
import Mongodb from '@devstation.co/mongodb.infrastructure.micromodule';
import Database from '@devstation.co/database.infrastructure.micromodule';
import IdGenerator from '@devstation.co/id-generator.infrastructure.micromodule';

export default class Infrastructure extends Base {
	constructor({ commandBus, eventBus, validator, logger, mongodb, database }) {
		super({
			micromodules: [
				{
					name: 'commandBus',
					settings: commandBus,
					micromodule: CommandBus,
				},
				{
					name: 'eventBus',
					settings: eventBus,
					micromodule: EventBus,
				},
				{
					name: 'validator',
					settings: validator,
					micromodule: Validator,
				},
				{
					name: 'logger',
					settings: logger,
					micromodule: Logger,
				},
				{
					name: 'mongodb',
					settings: mongodb,
					micromodule: Mongodb,
				},
				{
					name: 'database',
					settings: database,
					micromodule: Database,
				},
				{
					name: 'idGenerator',
					settings: {},
					micromodule: IdGenerator,
				},
			],
		});
	}
}
