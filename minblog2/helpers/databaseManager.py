from pymongo import MongoClient

# DB set-up
client = MongoClient()
db = client.flaskr
entries_col = db.entries

# sort by [default] ascending order
def get_all_entries(sort_by=-1):
    all_entries = entries_col.find().sort([("_id", sort_by)])
    entries_as_dict = [ dict(id=str(entry.get('_id', '9999')),
                             author=entry.get('username', '????'),
                             date=entry.get('date', '????'),
                             time=entry.get('time', '????'),
                             title=entry.get('title', '????'),
                             text=entry.get('text', '????'),
                             modified=entry.get('modified', '????'),
                             is_modified=entry.get('is_modified', False)) for entry in all_entries ]
    return entries_as_dict
