import Base from '@devstation-co/base-event.domain.micromodule';

export default class DeveloperCreated extends Base {
	constructor(params) {
		super({
			type: 'developerCreated',
			aggregateType: 'developer',
			...params,
		});
	}

	apply({ state }) {
		const { aggregate, meta, payload, timestamp } = this.getDetails();
		const newState = { ...state };
		newState.id = aggregate.id;
		newState.userId = meta.userId;
		newState.timestamp = timestamp;
		newState.firstName = payload.firstName;
		newState.lastName = payload.lastName;
		newState.emailAddresses = payload.emailAddresses.map((item) => {
			if (item.primary) newState.primaryEmailAddress = item.emailAddress;
			return item.emailAddress;
		});
		newState.phoneNumbers = payload.phoneNumbers;
		newState.active = true;
		return newState;
	}
}
