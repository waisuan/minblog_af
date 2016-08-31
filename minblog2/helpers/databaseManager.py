from pymongo import MongoClient

# DB set-up
client = MongoClient()
db = client.flaskr
entries_col = db.entries

# sort by [default] ascending order
def get_all_entries(sort_by=-1):
    all_entries = entries_col.find().sort([("_id", sort_by)])
    entries_as_dict = [dict(id=str(entry['_id']),
                            author=entry['username'],
                            date=entry['date'],
                            time=entry['time'],
                            title=entry['title'],
                            text=entry['text'],
                            modified=entry['modified'],
                            is_modified=entry['is_modified']) for entry in all_entries]
    return entries_as_dict
