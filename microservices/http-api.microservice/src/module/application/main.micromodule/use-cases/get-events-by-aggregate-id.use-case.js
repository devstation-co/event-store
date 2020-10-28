export default function getEventsByAggregateId({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'getEventsByAggregateId',
				handler: 'event-store.queries',
				params: {
					token: params.token,
					aggregateId: params.aggregateId,
				},
			};
			const response = await infrastructure.commandBus.handle(query);
			return response;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				module: 'http-api',
				source: {
					service: 'event-store',
					layer: {
						name: 'api',
						type: 'application',
					},
					method: {
						name: 'getEventsByAggregateId',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
