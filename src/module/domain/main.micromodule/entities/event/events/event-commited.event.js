import Base from '@clean-framework/domain-event';

export default class EventCommited extends Base {
	constructor(params) {
		super({
			type: 'eventCommited',
			aggregateType: 'event',
			...params,
		});
	}

	apply({ state }) {
		const { aggregate, meta, payload, timestamp } = this.getDetails();
		const newState = { ...state };
		newState.id = aggregate.id;
		newState.userId = meta.userId;
		newState.timestamp = timestamp;
		newState.active = true;
		return newState;
	}
}
