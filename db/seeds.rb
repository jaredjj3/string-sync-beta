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
  roles = Role.all

  [
    { username: "jaredjj3", email: "jaredjj3@gmail.com", password: "password", roles: roles },
    { username: "samblakelock", email: "samblakelock@gmail.com", password: "password", roles: roles }
  ].each { |user| User.create!(user) }
end

def create_tags
  %W(acoustic ambient beginner classical gospel jazz neosoul fusion metal).each do |tag|
    Tag.create!(tag)
  end
end

def create_notations(num = 20)
  teachers = User.joins(user_roles: :role).where(roles: { name: "teacher" })
  tags = Tag.all

  num.times do
    Notation.create!(
      user_id: teachers.sample.id,
      tags: tags.shuffle[0..2],
      name: Faker::Book.title,
      youtube_video_id: "https://youtu.be/w8uNZWDEYzQ",
      artist_name: Faker::Name.name,
      build_structs: "{\"measures\":[{\"width\":300,\"slices\":[{\"duration\":\"q\",\"positions\":[{\"str\":2,\"fret\":5},{\"str\":3,\"fret\":4},{\"str\":4,\"fret\":5}]},{\"duration\":\"q\",\"positions\":[{\"str\":5,\"fret\":3}]},{\"duration\":\"q\",\"positions\":[{\"str\":4,\"fret\":5}]},{\"duration\":\"q\",\"positions\":[{\"str\":2,\"fret\":5}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":3}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":4}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":3}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":1}]}]},{\"width\":200,\"slices\":[{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":5},{\"str\":3,\"fret\":7},{\"str\":4,\"fret\":6},{\"str\":5,\"fret\":7}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":7}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":9}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":9},{\"str\":3,\"fret\":7},{\"str\":4,\"fret\":9}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":7}]}]},{\"width\":200,\"slices\":[{\"duration\":\"h\",\"positions\":[{\"str\":5,\"fret\":12},{\"str\":4,\"fret\":14},{\"str\":3,\"fret\":12},{\"str\":2,\"fret\":13}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":17}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":13}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":17}]}]},{\"width\":200,\"slices\":[{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":10},{\"str\":2,\"fret\":11},{\"str\":3,\"fret\":10},{\"str\":4,\"fret\":12},{\"str\":5,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":8},{\"str\":2,\"fret\":8},{\"str\":3,\"fret\":9},{\"str\":4,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":12}]}]},{\"width\":200,\"slices\":[{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":12},{\"str\":2,\"fret\":10},{\"str\":3,\"fret\":10},{\"str\":4,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":13}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":7}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":10}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":8}]}]},{\"width\":200,\"slices\":[{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":7},{\"str\":2,\"fret\":8},{\"str\":3,\"fret\":7},{\"str\":4,\"fret\":9},{\"str\":5,\"fret\":7}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":8}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":9}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":6}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":9}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":5}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":8}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":6}]}]},{\"width\":200,\"slices\":[{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":5},{\"str\":2,\"fret\":6},{\"str\":3,\"fret\":7},{\"str\":6,\"fret\":6}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":6}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":8}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":6},{\"str\":3,\"fret\":5},{\"str\":4,\"fret\":7},{\"str\":5,\"fret\":5}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":6}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":8}]}]},{\"width\":200,\"slices\":[{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":5},{\"str\":3,\"fret\":6},{\"str\":4,\"fret\":5},{\"str\":5,\"fret\":7},{\"str\":6,\"fret\":5}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":6}]},{\"duration\":\"8\",\"positions\":[{\"str\":2,\"fret\":5}]},{\"duration\":\"8\",\"positions\":[{\"str\":3,\"fret\":7}]},{\"duration\":\"8\",\"positions\":[{\"str\":3,\"fret\":6}]},{\"duration\":\"8\",\"positions\":[{\"str\":4,\"fret\":7}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":5}]},{\"duration\":\"8\",\"positions\":[{\"str\":1,\"fret\":3}]}]}]}",
      scroll_structs: "[{\"measureIndex\":0,\"sliceIndex\":0,\"time\":0.16632903242492675},{\"measureIndex\":1,\"sliceIndex\":0,\"time\":2.163549938964844},{\"measureIndex\":1,\"sliceIndex\":3,\"time\":3.003947972343445},{\"measureIndex\":2,\"sliceIndex\":1,\"time\":4.947321076293945},{\"measureIndex\":3,\"sliceIndex\":1,\"time\":6.763068061035156},{\"measureIndex\":4,\"sliceIndex\":0,\"time\":7.7035779732971195},{\"measureIndex\":5,\"sliceIndex\":0,\"time\":9.552988997138977},{\"measureIndex\":6,\"sliceIndex\":0,\"time\":11.421135053405761},{\"measureIndex\":7,\"sliceIndex\":0,\"time\":13.280906031471252},{\"measureIndex\":7,\"sliceIndex\":7,\"time\":14.802483059127807}]"
    )
  end
end

init
delete_all
create_roles
create_users
create_tags
