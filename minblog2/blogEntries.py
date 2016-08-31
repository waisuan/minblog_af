from flask import render_template, request, session
from minblog2 import app
from minblog2.helpers import databaseManager

@app.route('/')
def show_all_entries():
    return render_template('blogEntry-list/blogEntry-list.html',
                            all_entries=databaseManager.get_all_entries())
