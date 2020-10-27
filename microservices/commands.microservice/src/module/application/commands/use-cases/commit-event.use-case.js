export default function commitEvent({ infrastructure, domain }) {
	return async ({ params }) => {
		try {
			const { Event } = domain.main.entities;
			const event = new Event({
				database: infrastructure.database,
			});
			const newEvent = {
				id: infrastructure.idGenerator.generate(),
				type: params.type,
				timestamp: new Date(),
				aggregate: params.aggregate,
				meta: params.meta || {},
				payload: params.payload || {},
			};
			await event.repository.save({ state: newEvent });
			await infrastructure.eventBus.publish(newEvent);
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
