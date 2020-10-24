export default function getAllEvents({ infrastructure, domain }) {
	return async () => {
		try {
			const { Event } = domain.main.entities;
			const event = new Event({
				database: infrastructure.database,
			});
			const events = await event.repository.getAllEvents();
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
						name: 'getAllEvents',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}
