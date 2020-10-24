import EventstoreModule from './module';

(async () => {
	const eventstore = new EventstoreModule({
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
			mongodb: {
				host: process.env.MONGO_HOST,
				port: process.env.MONGO_PORT,
				username: process.env.MONGO_USERNAME,
				password: process.env.MONGO_PASSWORD,
				db: process.env.MONGO_DB,
			},
			database: {
				dependencies: ['logger', 'mongodb'],
				type: 'mongodb',
				init: true,
			},
		},
	});
	const interfaces = ['commands', 'queries'];
	await eventstore.init();
	const res = await eventstore.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		eventstore.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		eventstore.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		eventstore.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		eventstore.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();
