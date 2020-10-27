import Base from '@clean-framework/infrastructure';
import CommandBus from '@devstation.co/command-bus.infrastructure.micromodule';
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import Logger from '@devstation.co/logger.infrastructure.micromodule';
import Mongodb from '@devstation.co/mongodb.infrastructure.micromodule';
import Database from '@devstation.co/database.infrastructure.micromodule';

export default class Infrastructure extends Base {
	constructor({ commandBus, validator, logger, mongodb, database }) {
		super({
			micromodules: [
				{
					name: 'commandBus',
					settings: commandBus,
					micromodule: CommandBus,
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
			],
		});
	}
}
