json.id                 user.id
json.email              user.email
json.username           user.username
json.roles              user.roles.map(&:name)
json.saved_notation_ids user.saved_notations.map(&:id)
