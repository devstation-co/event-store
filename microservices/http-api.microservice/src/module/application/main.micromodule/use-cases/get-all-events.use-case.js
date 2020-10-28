export default function getAllEvents({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'getAllEvents',
				handler: 'event-store.queries',
				params: {
					token: params.token,
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
						name: 'getAllEvents',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
