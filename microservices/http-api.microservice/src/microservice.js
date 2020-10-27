import HttpApi from './module';

(async () => {
	const httpApi = new HttpApi({
		infrastructure: {
			logger: {
				env: process.env.NODE_ENV,
				source: process.env.MICROSERVICE_NAME,
			},
			webServer: {
				port: process.env.WEB_SERVER_PORT,
				init: true,
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
		},
	});
	const interfaces = ['http'];
	await httpApi.init();
	const res = await httpApi.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		httpApi.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		httpApi.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		httpApi.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		httpApi.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();
