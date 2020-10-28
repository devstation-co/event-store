import getAllEvents from './get-all-events.controller';
import checkHealth from './check-health.controller';
import commitEvent from './commit-event.controller';
import getEventsByAggregateId from './get-events-by-aggregate-id.controller';
import getEventsByAggregateType from './get-events-by-aggregate-type.controller';
import getEvent from './get-event.controller';

export default {
	getAllEvents,
	checkHealth,
	commitEvent,
	getEventsByAggregateId,
	getEventsByAggregateType,
	getEvent,
};
