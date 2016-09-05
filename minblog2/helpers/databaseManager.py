from pymongo import MongoClient

class DatabaseManager:
    # DB set-up
    def __init__(self):
        client = MongoClient()
        db = client.flaskr
        self.entries_col = db.entries

    # sort by [default] ascending order
    def get_all_entries(self, sort_by=-1):
        all_entries = self.entries_col.find().sort([("_id", sort_by)])
        entries_as_dict = [ dict(id=str(entry.get('_id', '9999')),
                                 author=entry.get('username', '????'),
                                 date=entry.get('date', '????'),
                                 time=entry.get('time', '????'),
                                 title=entry.get('title', '????'),
                                 text=entry.get('text', '????'),
                                 modified=entry.get('modified', '????'),
                                 is_modified=entry.get('is_modified', False)) for entry in all_entries ]
        return entries_as_dict

    def create_new_entry(self, new_entry_title, new_entry_text):
        pass
