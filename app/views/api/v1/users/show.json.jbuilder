json.id             user.id
json.email          user.email
json.username       user.username
json.roles          user.roles.map(&:name)
json.loggedIn       logged_in?
json.savedNotations user.saved_notations.map(&:id)
