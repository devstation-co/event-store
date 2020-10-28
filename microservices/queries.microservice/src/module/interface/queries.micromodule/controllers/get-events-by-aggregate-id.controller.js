export default function getEventsByAggregateId({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const schema = {
				$$strict: 'remove',
				token: {
					type: 'string',
					optional: false,
				},
				aggregateId: {
					type: 'string',
					optional: false,
				},
			};
			await infrastructure.validator.validate({ data: params, schema });
			if (params.token !== process.env.EVENTSTORE_TOKEN) throw new Error('Unauthorized');
			const response = await application.queries.getEventsByAggregateId({
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
						name: 'getEventsByAggregateId',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
