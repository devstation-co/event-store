export default function commitEvent({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const schema = {
				$$strict: 'remove',
				token: {
					type: 'string',
					optional: false,
					empty: false,
				},
				type: {
					type: 'string',
					optional: false,
					empty: false,
				},
				aggregate: {
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
			};
			await infrastructure.validator.validate({ data: params, schema });
			if (params.token !== process.env.EVENTSTORE_TOKEN) throw new Error('Unauthorized');
			const event = {
				type: params.type,
				aggregate: params.aggregate,
				meta: params.meta,
				payload: params.payload,
			};
			const res = await application.commands.commitEvent({ params: event });
			return res;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'event-store',
					module: 'main',
					layer: {
						name: 'commands',
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
