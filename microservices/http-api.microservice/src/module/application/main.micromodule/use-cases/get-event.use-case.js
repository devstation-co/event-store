export default function getEvent({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'getEvent',
				handler: 'event-store.queries',
				params: {
					token: params.token,
					eventId: params.eventId,
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
						name: 'getEvent',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
