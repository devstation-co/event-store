export default function getEventsByAggregateId({ infrastructure, domain }) {
	return async ({ params }) => {
		try {
			const { Event } = domain.main.entities;
			const event = new Event({
				database: infrastructure.database,
			});
			const events = await event.repository.getEventsByAggregateId({
				aggregateId: params.aggregateId,
			});
			return events;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'eventstore',
					module: 'main',
					layer: {
						name: 'queries',
						type: 'application',
					},
					method: {
						name: 'getEventsByAggregateId',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
