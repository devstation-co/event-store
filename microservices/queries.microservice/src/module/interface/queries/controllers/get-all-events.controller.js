export default function getAllEvents({ infrastructure, application }) {
	return async ({ params }) => {
		try {
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
