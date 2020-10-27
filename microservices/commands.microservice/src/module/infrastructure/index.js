import Base from '@clean-framework/infrastructure';
import CommandBus from '@devstation.co/command-bus.infrastructure.micromodule';
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import Logger from '@devstation.co/logger.infrastructure.micromodule';

export default class Infrastructure extends Base {
	constructor({ commandBus, validator, logger }) {
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
			],
		});
	}
}
