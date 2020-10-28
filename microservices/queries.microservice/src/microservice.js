import QueriesModule from './module';

(async () => {
	const queriesModule = new QueriesModule({
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
				seed: {},
			},
		},
	});
	const interfaces = ['queries'];
	await queriesModule.init();
	const res = await queriesModule.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		queriesModule.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		queriesModule.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		queriesModule.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		queriesModule.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();
