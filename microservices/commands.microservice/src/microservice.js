import CommandsModule from './module';

(async () => {
	const commandsModule = new CommandsModule({
		infrastructure: {
			logger: {
				env: process.env.NODE_ENV,
				source: process.env.MICROSERVICE_NAME,
			},
			commandBus: {
				dependencies: ['logger'],
				nats: {
					host: process.env.NATS_HOST,
					port: process.env.NATS_PORT,
					username: process.env.NATS_USERNAME,
					password: process.env.NATS_PASSWORD,
				},
				init: true,
			},
			eventBus: {
				dependencies: ['logger'],
				nats: {
					host: process.env.NATS_HOST,
					port: process.env.NATS_PORT,
					username: process.env.NATS_USERNAME,
					password: process.env.NATS_PASSWORD,
				},
				init: true,
			},
		},
	});
	const interfaces = ['commands'];
	await commandsModule.init();
	const res = await commandsModule.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		commandsModule.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		commandsModule.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		commandsModule.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		commandsModule.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();
