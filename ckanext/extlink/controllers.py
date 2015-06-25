from pylons.i18n import _

from ckan.lib.base import BaseController, c
import ckan.plugins as p
import ckan.model as model
import ckan.lib.base as base
import ckan.logic as logic
import ckan.lib.navl.dictization_functions as df
import ckan.lib.helpers as h
import ckan.new_authz

import ckanext.extlink.model as extlinkmodel
from ckanext.extlink.plugin import MSG as msg_default

c = base.c

class ExtLinkController(BaseController):
    controller_path = 'ckanext.extlink.controllers:ExtLinkController'
    def form(self):
        context = {'model': model, 'user': c.user}
        if not ckan.new_authz.is_authorized('sysadmin',
                context, {})['success']:
            base.abort(401, _('Need to be system administrator'))
        # get one and only one entry from our extlink table
        entry = model.Session.query(extlinkmodel.ExtLink).first()
        if not entry:
            # create the empty entry for the first time
            entry = extlinkmodel.ExtLink()
            entry.save()

        if base.request.method == "POST":
            data = logic.clean_dict(
                    df.unflatten(
                        logic.tuplize_dict(
                            logic.parse_params(base.request.params)
                    )))
            entry.domains = data.get('white-list')
            entry.message = data.get('message')
            entry.save()
            h.flash_success(_('External link changes saved.'))
            h.redirect_to(controller=self.controller_path, action='form')

        c.extlinkdata = {
            'white-list': entry.domains,
            'message': entry.message,
            'placeholder': msg_default,
        }
        return p.toolkit.render("form.html")
