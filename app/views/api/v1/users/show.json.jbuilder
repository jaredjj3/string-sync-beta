json.id              @user.id
json.email           @user.email
json.username        @user.username
json.roles           @user.roles.map(&:name)
json.saved_notations @user.saved_notations.map(&:id)
