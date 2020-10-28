export default function getAllEvents({ application, infrastructure }) {
	return async ({ request }) => {
		try {
			if (!request.headers.token || request.headers.token !== process.env.EVENTSTORE_TOKEN)
				throw new Error('Unauthorized');
			const response = await application.main.getAllEvents({
				params: {
					token: request.headers.token,
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
						name: 'getAllEvents',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
