export default function getEventsByAggregateType({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'getEventsByAggregateType',
				handler: 'event-store.queries',
				params: {
					token: params.token,
					aggregateType: params.aggregateType,
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
						name: 'getEventsByAggregateType',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
