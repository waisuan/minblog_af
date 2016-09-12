from flask import render_template, make_response, request
from flask_restful import Resource

from minblog2 import app
from minblog2.core import api
from minblog2.core import dbManager


@app.route('/')
@app.route('/create')
@app.route('/detail/<path:id>')
def route_to_main(id=None):
    return make_response(open('minblog2/templates/main/main.html').read())


class BlogEntries(Resource):
    def get(self):
        return dbManager.get_all_entries()

    def post(self):
        post_payload = request.get_json()
        if post_payload is not None:
            newEntryTitle = post_payload.get('title')
            newEntryText = post_payload.get('text')
            if newEntryTitle is None or newEntryText is None:
                return {}, 400 # Something bad just happened...
            return {'_id' : dbManager.create_new_entry(newEntryTitle, newEntryText)}, 201
        return {}, 201


class BlogEntryDetail(Resource):
    def get(self, entryId):
        return dbManager.get_entry_by_id(entryId)


api.add_resource(BlogEntries, '/api/blogentries')
api.add_resource(BlogEntryDetail, '/api/blogentrydetail/<entryId>')

# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404
