hexo.extend.generator.register('application-pages', function(locals) {
	return locals.mfac_api_data.applicationList.map(function(app) {
		return {
			path : 'applications/' + app.name.toLowerCase().replace(/\s+/g, '-') + '.html',
			data : app,
			layout : 'application'
		};
	});
});
