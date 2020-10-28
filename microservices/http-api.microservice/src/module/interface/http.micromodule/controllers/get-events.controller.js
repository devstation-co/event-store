export default function getEvents({ application, infrastructure }) {
	return async ({ request }) => {
		try {
			const schema = {
				$$strict: 'remove',
				token: {
					type: 'string',
					optional: false,
				},
			};
			await infrastructure.validator.validate({ data: request.params, schema });
			if (request.params.token !== process.env.EVENTSTORE_TOKEN) throw new Error('Unauthorized');
			const response = await application.main.getEvents({ params: request.params });
			return response;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				module: 'http-api',
				source: {
					service: 'event-store',
					layer: {
						name: 'http',
						type: 'interface',
					},
					method: {
						name: 'getEvents',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
