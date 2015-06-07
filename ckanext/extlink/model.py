import logging
from sqlalchemy import Table, Column, types

import ckan.model as model
import ckan.model.meta  as meta
import ckan.model.domain_object as domain_object

log = logging.getLogger(__name__)

extlink_table = None

class ExtLinkException(Exception):
    pass

class ExtLink(domain_object.DomainObject):
    pass

def setup():

    if extlink_table is None:
        define_apps_tables()
        log.debug('Extlink table defined in memory')

    if model.repo.are_tables_created():
        if not extlink_table.exists():
            extlink_table.create()
            log.debug('Extlink table created')
        else:
            log.debug('Extlink table already exists')
    else:
        log.debug('Extlink_table table creation deferred')


extlink_table = Table('extlink', meta.metadata,
    Column('id', types.Integer(),  primary_key=True),
    Column('domains', types.UnicodeText, nullable=False, default=u''),
    Column('message', types.UnicodeText, nullable=False, default=u''),
)

meta.mapper(ExtLink, extlink_table)
