export default function getAggregateEvents({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const response = await application.queries.getAggregateEvents({
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
						name: 'getAggregateEvents',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
