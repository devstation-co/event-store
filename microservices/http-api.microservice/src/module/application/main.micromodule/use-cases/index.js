import getAllEvents from './get-all-events.use-case';
import commitEvent from './commit-event.use-case';
import getEventsByAggregateId from './get-events-by-aggregate-id.use-case';
import getEventsByAggregateType from './get-events-by-aggregate-type.use-case';
import getEvent from './get-event.use-case';

export default {
	getAllEvents,
	commitEvent,
	getEventsByAggregateId,
	getEventsByAggregateType,
	getEvent,
};
