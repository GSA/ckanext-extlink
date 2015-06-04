import ckan.plugins as p

class ExtLinkPlugin(p.SingletonPlugin):
    ''' A plugin to detect external links and add to them
        css and js.
    '''
    p.implements(p.IConfigurer)

    ## IConfigurer
    def update_config(self, config):

        p.toolkit.add_template_directory(config, 'templates')
        p.toolkit.add_public_directory(config, 'public')
        p.toolkit.add_resource('public', 'extlink')
