var
    extend = require('extend'),
    request = require('sync-request'),
    contentful = require('contentful');

/*
 * Pull Contentful data and set locals
 */
hexo.on('ready', function() {
    try {
        var contentfulClient = contentful.createClient({
            space: 'gxzhn42859qm',
            accessToken: 'cc7fa61539eb5285cf035864eb32eed598ce9ffba2a01c2257116f468c27a6bf'
        });
        // Get all Content: news, etc.
        contentfulClient.getEntries()
        .then(function(entries) {
            console.log('> Contentful Data:', entries.items);
        });
    } catch (e) {
        hexo.exit(e);
    }
});