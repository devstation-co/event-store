export default function commitEvent({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const res = await application.commands.commitEvent({ params });
			return res;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'eventstore',
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
