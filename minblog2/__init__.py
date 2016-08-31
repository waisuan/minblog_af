from flask import Flask, request, make_response, render_template
from flask_restful import Resource, Api, reqparse
import os

DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = os.urandom(32)

api = Api(app)
parser = reqparse.RequestParser()
parser.add_argument('data')


@app.route('/')
def hello_world():
    return render_template('index.html')


# class HelloWorld(Resource):
#     def get(self):
#         return {'get': 'dummy'}
#         #return render_template('index.html')
#         #return make_response(open('index.html').read())
#
#     def post(self):
#         args = parser.parse_args()
#         return {'post': args['data']}, 201
#
#
# class HelloWorld2(Resource):
#     def get(self, id):
#         return {id: 'hello_world'}
#
#     def delete(self, id):
#         return {'del': 'me'}, 201
#
#     def put(self, id):
#         args = parser.parse_args()
#         return {'put': args['data']}, 201
#
#
# api.add_resource(HelloWorld, '/', '/dummy')
# api.add_resource(HelloWorld2, '/<string:id>')


if __name__ == '__main__':
    app.run()
