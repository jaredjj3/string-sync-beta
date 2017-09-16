BUILD_STRUCTS = <<-BUILD.split("\n").map { |line| line.strip }.join("\n")
tabstave
notation=true
key=A
time=4/4
clef=none
notes =|: :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4 $Fi,Ga,Ro!$
notes :q (5/4.5/5) (7/4.7/5)s(5/4.5/5) ^3^
notes :8 7-5/4 $.a./b.$ (5/4.5/5)h(7/5) =:|
notes :8 (12/5.12/4)ds(5/5.5/4)u 3b4/5
notes :h (5V/6.5/4.6/3.7/2) $.italic.let ring$
notes =|: :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4 $Fi,Ga,Ro!$
BUILD

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
    Tag.create!(name: tag)
  end
end

def create_notations(num)
  teachers = User.joins(user_roles: :role).where(roles: { name: "teacher" })
  tags = Tag.all

  num.times do
    Notation.create!(
      user_id: teachers.sample.id,
      tags: tags.shuffle[0..2],
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