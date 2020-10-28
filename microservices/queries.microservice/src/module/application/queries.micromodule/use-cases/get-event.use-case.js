export default function getEvent({ infrastructure, domain }) {
	return async ({ params }) => {
		try {
			const { Event } = domain.main.entities;
			const event = new Event({
				database: infrastructure.database,
			});
			const events = await event.repository.getEvent({ eventId: params.eventId });
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
						name: 'getEvent',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
