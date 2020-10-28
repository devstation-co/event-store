export default function getAllEvents({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			if (params.token !== process.env.EVENTSTORE_TOKEN) throw new Error('Unauthorized');
			const response = await application.queries.getAllEvents({
				params,
			});
			return response;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'eventstore',
					module: 'main',
					layer: {
						name: 'queries',
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
