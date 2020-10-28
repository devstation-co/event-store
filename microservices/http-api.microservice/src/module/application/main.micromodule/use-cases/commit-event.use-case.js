export default function commitEvent({ infrastructure }) {
	return async ({ params }) => {
		try {
			const command = {
				name: 'commitEvent',
				handler: 'event-store.commands',
				params: {
					token: params.token,
					event: params.event,
				},
			};
			const response = await infrastructure.commandBus.handle(command);
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
						name: 'commitEvent',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
