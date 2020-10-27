export default function commitEvent({ infrastructure, domain }) {
	return async ({ params }) => {
		try {
			const { Event } = domain.main.entities;
			const aggregateId = infrastructure.idGenerator.generate();
			const event = new Event({
				database: infrastructure.database,
			});
			event.setId({ id: aggregateId });
			await event.apply({
				events: [
					{
						type: 'eventCommited',
						meta: {},
						aggregate: {
							id: aggregateId,
							type: 'event',
						},
						timestamp: new Date(),
						payload: {
							event: params.event,
						},
					},
				],
				save: true,
			});
			const currentState = await event.getState();
			await infrastructure.eventBus.publish(currentState);
			return true;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'eventstore',
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
