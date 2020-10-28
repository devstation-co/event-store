export default function getEventsByAggregateId({ application, infrastructure }) {
	return async ({ request }) => {
		try {
			const schema = {
				$$strict: 'remove',
				aggregateId: {
					type: 'string',
					optional: false,
					empty: false,
				},
			};
			await infrastructure.validator.validate({ data: request.query, schema });
			if (!request.headers.token || request.headers.token !== process.env.EVENTSTORE_TOKEN)
				throw new Error('Unauthorized');
			const response = await application.main.getEventsByAggregateId({
				params: {
					token: request.headers.token,
					...request.query,
				},
			});
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
						name: 'getEventsByAggregateId',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
