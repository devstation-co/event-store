import getAllEvents from './get-all-events.route';
import health from './health.route';
import commitEvent from './commit-event.route';
import getEventsByAggregateId from './get-events-by-aggregate-id.route';
import getEventsByAggregateType from './get-events-by-aggregate-type.route';
import getEvent from './get-event.route';

export default [
	getAllEvents,
	health,
	commitEvent,
	getEventsByAggregateId,
	getEventsByAggregateType,
	getEvent,
];
