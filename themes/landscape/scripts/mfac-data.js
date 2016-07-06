var 
    extend = require('extend'),
    request = require('sync-request');

/*
 * Pull MFAC data and set locals
 */
hexo.on('ready', function() {
    try {
        var response = request('GET', hexo.config.api_url);
        if (response.statusCode === 200) {
            var json = JSON.parse(response.getBody('utf8'));
            hexo.locals.set('mfac_api_data', json.data);
            hexo.emit('mfac:data_ready', json.data);
        } else {
            throw new Error('Server responded with status code '
                    + response.statusCode + ':\n'
                    + response.body.toString());
        }
    } catch (e) {
        hexo.exit(e);
    }
});

/*
 * Expose MFAC data for template locals
 */
hexo.extend.filter.register('template_locals', function(locals) {
    var region = locals.page.region || hexo.config.region;
    var data = hexo.locals.get('mfac_api_data');

    if (data && data.site)
        locals.mfac = extend(true, {}, data.site);

    if (data && data[region])
        locals.mfac = extend(true, locals.mfac, data[region]);

    return locals;
});
