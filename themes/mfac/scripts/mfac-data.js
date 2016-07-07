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
            hexo.locals.set('mfac_api_data', json);
            hexo.emit('mfac:data_ready', json);
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
    if (data)
        locals.mfac = extend(true, {}, data);

    return locals;
});

hexo.on('mfac:data_ready', function (data) {
    for (var i = 0; i < data.applicationList.length; i++) {
      var app = data.applicationList[i];
      var page = hexo.model('Page').find({ title: app.name});
      page.app = app.infoPage;
      console.log("Trigger", page.app);
    }


    //return '';
});
