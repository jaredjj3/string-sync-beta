def init
  Rails.application.eager_load!
end

def delete_all
  ApplicationRecord.descendants.each(&:delete_all)
end

def create_roles
  %W(student teacher admin).each { |name| Role.create!(name: name) }
end

def create_users
  all_roles = Roles.all
  [
    { username: "jaredjj3", email: "jaredjj3@gmail.com", password: "password", roles: all_roles },
    { username: "samblakelock", email: "samblakelock@gmail.com", password: "password", roles: all_roles }
  ].each { |user| User.create!(user) }
end

init
delete_all
create_roles
create_users
