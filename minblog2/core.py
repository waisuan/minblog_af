from flask_restful import Api, reqparse

from minblog2 import app
from minblog2.helpers.databaseManager import DatabaseManager


api = Api(app)
# parser = reqparse.RequestParser()
# parser.add_argument('data')
try:
    dbManager = DatabaseManager()
except pymongo.errors.ConnectionFailure, e:
    print "Could not connect to server: %s" % e
    # Don't continue if we can't connect to DB.
    sys.exit
