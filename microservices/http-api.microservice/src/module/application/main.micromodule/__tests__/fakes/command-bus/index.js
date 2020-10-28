export default {
	handle: async ({ name }) => {
		switch (name) {
			case 'commitEvent':
				return { status: 'success' };
			case 'getEvents':
				return { status: 'success', payload: [{ type: 'testCreated' }] };
			default:
				break;
		}
		return true;
	},
};
