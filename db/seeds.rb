BUILD_STRUCTS = <<-BUILD.split("\n").map { |line| line.strip }.join("\n")
tabstave
clef=none
notation=true
key=C time=6/8

notes | :8 (5/4.4/3.5/2) 3/5 5/4 5/2 :16 3-4-3/2 :8 1/2
notes | :8 s(7/5.6/4.7/3.5/2) 7-9/2 (9/4.7/3.9/2)s10/2 7/1
notes | :qd (12/5.14/4.12/3.13/2) :8 17/2 13/1 17/2
notes | :qd (10/5.12/4.10/3.11/2.10/1) :8 (10/4.9/3.8/2.8/1) 10/1 s12/1
notes | :8 (10/4.10/3.10/2.12/1) 10/1 13/2 7/1 10-8/2
notes | :8 (7/5.9/4.7/3.8/2.7/1) :16 8-9/2 6/1 9/2 :8 5/1 8-6/2
notes | :8 (6/6.7/3.6/2.5/1) 6/2 8/1 (5/5.7/4.5/3.6/2) 6-8/2
notes | :8 (5/6.7/5.5/4.6/3.5/2) :16 6-5/2 7-6/3 7/4 ##
notes | :8 (5/4.4/3.5/2) 3/5 5/4 5/2 :16 3-4-3/2 ^3^ :8 1/2
notes | :8 (5/4.4/3.5/2) 3/5 5/4 5/2 :16 3-4-3/2 :8 1/2
notes | :8 s(7/5.6/4.7/3.5/2) 7-9/2 (9/4.7/3.9/2)s10/2 7/1
BUILD

def init
  Rails.application.eager_load!
end

def delete_all
  return unless Rails.env.development?
  ApplicationRecord.descendants.each(&:delete_all)
end

def create_roles
  %W(student teacher admin).each { |name| Role.create!(name: name) }
end

def create_users
  roles = Role.all

  [
    { username: "jaredjj3", email: "jaredjj3@gmail.com", password: "password", roles: roles },
  ].each { |user| User.create!(user) }
end

def create_tags
  %W(acoustic ambient beginner classical gospel jazz neosoul fusion metal).each do |tag|
    Tag.create!(name: tag)
  end
end

def create_notations(num)
  teachers = User.joins(user_roles: :role).where(roles: { name: "teacher" })
  tags = Tag.all

  num.times do
    Notation.create!(
      user_id: teachers.sample.id,
      taggings_attributes: tags.shuffle[0..2].map { |tag| { tag_id: tag.id } },
      name: Faker::Book.title,
      youtube_video_id: "https://youtu.be/w8uNZWDEYzQ",
      duration: 14.841 * 1000,
      artist_name: Faker::Name.name,
      thumbnail: File.open(Dir["app/assets/images/thumbnails/*.jpg"].sample),
      vextab: BUILD_STRUCTS,
      tempo: 120,
      featured: rand < 0.5
    )
  end
end

def create_saved_notations
  notations = Notation.all.to_a
  User.all.each { |user| user.saved_notations << notations.sample(rand(notations.size)) }
end

ActiveRecord::Base.transaction do
  init
  delete_all
  create_roles
  create_users
  create_tags
  create_notations(100)
  create_saved_notations
end