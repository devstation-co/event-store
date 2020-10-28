export default function getEvent({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const schema = {
				$$strict: 'remove',
				token: {
					type: 'string',
					optional: false,
				},
				eventId: {
					type: 'string',
					optional: false,
				},
			};
			await infrastructure.validator.validate({ data: params, schema });
			if (params.token !== process.env.EVENTSTORE_TOKEN) throw new Error('Unauthorized');
			const response = await application.queries.getEvent({
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
						name: 'getEvent',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
