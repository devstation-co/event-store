export default function commitEvent({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const schema = {
				$$strict: 'remove',
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
			const res = await application.commands.commitEvent({ params });
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
