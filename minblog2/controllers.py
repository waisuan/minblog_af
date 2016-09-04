from flask import render_template, make_response, request
from flask_restful import Resource

from minblog2 import app
from minblog2.core import api
from minblog2.helpers import databaseManager


@app.route('/')
def route_to_main():
    return make_response(open('minblog2/templates/main/main.html').read())


class BlogEntries(Resource):
    def get(self):
        all_entries = databaseManager.get_all_entries()
        print len(all_entries)
        return all_entries

    def post(self):
        post_payload = request.get_json()
        if post_payload is not None:
            print post_payload.get('data')
        return {}, 200


api.add_resource(BlogEntries, '/api/blogentries')

# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404
