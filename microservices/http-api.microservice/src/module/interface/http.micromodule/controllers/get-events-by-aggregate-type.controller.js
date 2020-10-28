export default function getEventsByAggregateType({ application, infrastructure }) {
	return async ({ request }) => {
		try {
			const schema = {
				$$strict: 'remove',
				aggregateType: {
					type: 'string',
					optional: false,
					empty: false,
				},
			};
			await infrastructure.validator.validate({ data: request.query, schema });
			if (!request.headers.token || request.headers.token !== process.env.EVENTSTORE_TOKEN)
				throw new Error('Unauthorized');
			const response = await application.main.getEventsByAggregateType({
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
						name: 'getEventsByAggregateType',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
