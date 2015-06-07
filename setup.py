from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(
	name='ckanext-extlink',
	version=version,
	description="Make user aware of external links by giving them different look and behavivor",
	long_description="""\
	""",
	classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
	keywords='',
	author='REI',
	author_email='',
	url='',
	license='',
	packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
	namespace_packages=['ckanext', 'ckanext.extlink'],
	include_package_data=True,
	zip_safe=False,
	install_requires=[
		# -*- Extra requirements: -*-
	],
	entry_points=\
	"""
        [ckan.plugins]
	# Add plugins here, eg
	# myplugin=ckanext.extlink:PluginClass
    extlink=ckanext.extlink.plugin:ExtLinkPlugin
	""",
)
