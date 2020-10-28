export default function commitEvent({ application, infrastructure }) {
	return async ({ request }) => {
		try {
			const schema = {
				$$strict: 'remove',
				token: {
					type: 'string',
					optional: false,
				},
				event: {
					$$strict: 'remove',
					type: 'object',
					props: {
						type: {
							type: 'string',
							optional: false,
						},
						timestamp: {
							type: 'date',
							convert: true,
							optional: false,
						},
						aggregate: {
							$$strict: 'remove',
							type: 'object',
							props: {
								id: {
									type: 'string',
									optional: false,
									empty: false,
								},
								type: {
									type: 'string',
									optional: false,
									empty: false,
								},
							},
						},
						meta: {
							type: 'object',
							optional: true,
						},
						payload: {
							type: 'object',
							optional: true,
						},
					},
				},
			};
			await infrastructure.validator.validate({ data: request.params, schema });
			if (request.params.token !== process.env.EVENTSTORE_TOKEN) throw new Error('Unauthorized');
			const response = await application.main.commitEvent({
				params: request.params,
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
						name: 'commitEvent',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}
