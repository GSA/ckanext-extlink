import json
import re

import ckan.plugins as p
import ckan.model as model

import ckanext.extlink.model as extlinkmodel

MSG = 'Disclaimer: This link will take you to an external website.'

class ExtLinkPlugin(p.SingletonPlugin):
    ''' A plugin to detect external links and add to them css and js.
    '''
    p.implements(p.IConfigurer)
    p.implements(p.IConfigurable)
    p.implements(p.IRoutes, inherit=True)
    p.implements(p.ITemplateHelpers)

    ## IConfigurer
    def update_config(self, config):
        p.toolkit.add_template_directory(config, 'templates')
        p.toolkit.add_public_directory(config, 'public')
        p.toolkit.add_resource('public', 'extlink')

    ## IRoutes
    def before_map(self, map):
        ctrl = 'ckanext.extlink.controllers:ExtLinkController'
        map.connect('extlink', '/extlink', controller=ctrl, action='form')
        return map

    ## IConfigurable
    def configure(self, config):
        extlinkmodel.setup()

    ## ITemplateHelpers
    def get_helpers(self):
        return {'get_extlink_data': self.get_extlink_data}

    def get_extlink_data(self):
        entry = model.Session.query(extlinkmodel.ExtLink).first()
        white_list = ''
        message = MSG
        if entry and entry.domains:
            # delimiters will be merged and replaced with single comma
            rx = re.compile('[ ,\n\r]+')
            white_list = rx.sub(',', entry.domains)
        if entry and entry.message.strip():
            message = entry.message

        return {'white-list': white_list, 'message': message}

