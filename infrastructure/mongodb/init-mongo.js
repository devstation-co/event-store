db.createUser({
	user: 'dev',
	pwd: 'devdevdev',
	roles: [{ role: 'readWrite', db: 'dev-db' }],
});
