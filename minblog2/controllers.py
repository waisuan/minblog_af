from flask import render_template, make_response
from flask_restful import Resource

from minblog2 import app
from minblog2.core import api
from minblog2.helpers import databaseManager


@app.route('/')
def route_to_main():
    return make_response(open('minblog2/templates/main/main.html').read())


class BlogEntries(Resource):
    def get(self):
        return { 'blogEntries': databaseManager.get_all_entries() }
        # return {'key': 'dummy',
        #         'dummies': ['d1', 'd2', 'd3']}


api.add_resource(BlogEntries, '/api/blogentry')

# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404
