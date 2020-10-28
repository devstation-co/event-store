export default function commitEvent({ infrastructure, domain }) {
	return async ({ params }) => {
		try {
			const { Event } = domain.main.entities;
			const event = new Event({
				database: infrastructure.database,
			});
			event.setId({ id: infrastructure.idGenerator.generate() });
			const res = await event.create({
				event: params,
			});
			await infrastructure.eventBus.publish({ event: res.payload });
			return { status: 'success', timestamp: new Date() };
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'event-store',
					module: 'main',
					layer: {
						name: 'commands',
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
