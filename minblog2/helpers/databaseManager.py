from pymongo import MongoClient
import time
from bson import ObjectId

class DatabaseManager:
    # DB set-up
    def __init__(self):
        client = MongoClient()
        db = client.flaskr
        self.entries_col = db.entries

    # sort by [default] descending/latest order
    def get_all_entries(self, sort_by=-1):
        all_entries = self.entries_col.find().sort([('_id', sort_by)])
        entries_as_dict =   [
                                dict(
                                        entry_id            = str(entry.get('_id', '9999')),
                                        creator             = entry.get('creator', '????'),
                                        created_on_date     = entry.get('created_on_date', '????'),
                                        created_on_time     = entry.get('created_on_time', '????'),
                                        entry_title         = entry.get('entry_title', '????'),
                                        entry_text          = entry.get('entry_text', '????'),
                                        quick_text          = entry.get('quick_text', entry.get('entry_text')),
                                        modified_on_date    = entry.get('modified_on_date', '????'),
                                        modified_on_time    = entry.get('modified_on_time', '????'),
                                        is_modified         = entry.get('is_modified', False)
                                    ) for entry in all_entries
                            ]

        return entries_as_dict

    def get_entries_by_pages(self, last_entry_id, sort_by=-1):
        curr_entries = self.entries.col.find({'_id': {'$gt': ObjectId(last_entry_id)}}).sort({'$natural': sort_by}).limit(10)
        entries_as_dict =   [
                                dict(
                                        entry_id            = str(entry.get('_id', '9999')),
                                        creator             = entry.get('creator', '????'),
                                        created_on_date     = entry.get('created_on_date', '????'),
                                        created_on_time     = entry.get('created_on_time', '????'),
                                        entry_title         = entry.get('entry_title', '????'),
                                        entry_text          = entry.get('entry_text', '????'),
                                        quick_text          = entry.get('quick_text', entry.get('entry_text')),
                                        modified_on_date    = entry.get('modified_on_date', '????'),
                                        modified_on_time    = entry.get('modified_on_time', '????'),
                                        is_modified         = entry.get('is_modified', False)
                                    ) for entry in curr_entries
                            ]

        return entries_as_dict

    def get_entry_by_id(self, entry_id):
        entry = self.entries_col.find_one({'_id': ObjectId(entry_id)})
        if len(entry) == 0:
            return {}
        entry = dict(
                        entry_id            = str(entry.get('_id', '9999')),
                        creator             = entry.get('creator', '????'),
                        created_on_date     = entry.get('created_on_date', '????'),
                        created_on_time     = entry.get('created_on_time', '????'),
                        entry_title         = entry.get('entry_title', '????'),
                        entry_text          = entry.get('entry_text', '????'),
                        quick_text          = entry.get('quick_text', entry.get('entry_text')),
                        modified_on_date    = entry.get('modified_on_date', '????'),
                        modified_on_time    = entry.get('modified_on_time', '????'),
                        is_modified         = entry.get('is_modified', False)
                    )
        return entry

    def create_new_entry(self, newEntryTitle, newEntryText, newQuickText):
        now_date = time.strftime("%d/%m/%Y")
        now_time = time.strftime("%I:%M %p")

        insert_result = self.entries_col.insert_one({
                                                        'creator'           : 'admin',
                                                        'created_on_date'   : now_date,
                                                        'created_on_time'   : now_time,
                                                        'entry_title'       : newEntryTitle,
                                                        'entry_text'        : newEntryText,
                                                        'quick_text'        : newQuickText,
                                                        'modified_on_date'  : now_date,
                                                        'modified_on_time'  : now_time,
                                                        'is_modified'       : False
                                                    })

        return str(insert_result.inserted_id) # Original _id type is ObjectId

    def update_entry(self, entry_id, updatedEntryTitle, updatedEntryText, updatedQuickText):
        now_date = time.strftime("%d/%m/%Y")
        now_time = time.strftime("%I:%M %p")

        update_result = self.entries_col.update_one({'_id': ObjectId(entry_id)},
                                                    {'$set': {  'entry_title'       : updatedEntryTitle,
                                                                'entry_text'        : updatedEntryText,
                                                                'quick_text'        : updatedQuickText,
                                                                'modified_on_date'  : now_date,
                                                                'modified_on_time'  : now_time,
                                                                'is_modified'       : True
                                                             }
                                                    })

        return update_result.modified_count

    def delete_entry(self, entry_id):
        del_result = self.entries_col.delete_one({'_id': ObjectId(entry_id)})

        return del_result.deleted_count
