VEXTAB_STRING = <<-VEXTAB.split("\n").map { |line| line.strip }.join("\n")
tabstave
clef=none
notation=true
key=D time=4/4

notes | :4 (7/5.5/4.7/3.7/2) $Em9$ :8 (7/5.5/4.7/3.7/2) 7/5 :4 (7/5.5/4.7/3.7/2) 8/2
notes | :4 (10/5.11/4.9/3.11/2) $Gdim7$ :4 12/2 :4 (13/5.14/4.12/3.14/2) $A#dim7$ 15/2

tabstave
clef=none
notation=true
key=B time=4/4

notes | :8  0/6 $EM7$ 7/5 6/4 6/3 :4 8/3 :8 0/6 0/6
notes | :8 6/3 8/3 6/3 0/6 7/2 6/3 :4 8/3
notes | :8 0/6 7/5 9/2 6/3 :4 8/3 :4 0/6
notes | :8 7h9/2 6/1 ^3^ 9-7/2 8/3 ^3^ :4 (9/5.8/4.9/3) $F#7$ (9/5.8/4.8/3) $F#6$
notes | :4 0/6 $EM7$ :8 7/5 6/3 :4 8/3 :8 0/6 0/6
notes | :8 6-8-6/3 8-9-6/4 :4 (7/6.6/5.8/4) $BM7$
notes | :8 0-0/6 7/2 6/3 :4 8/3 :8 6s4/3

tabstave
clef=none
notation=true
key=D time=4/4

notes | :4 (3/6.4/3.3/2.2/1) $GM7$ 0/1 (2/6.4/5.2/4.3/3.2/2.2/1) $F#7$ 0/1
notes | :4 (7/6.7/3.7/2) $Bm7$ :8 (7/3.7/2) :8 7/6 :4 (7/3.7/2) :4 ##
notes | :4 (6/5.7/4.5/3.7/2) $D#dim7$ :8 (6/5.7/4.5/3.7/2) :8 6/5 :4 (6/5.7/4.5/3.7/2) :4 ##
notes | :4 (7/5.5/4.7/3.7/2) $Em9$ :8 (7/5.5/4.7/3.7/2) 7/5 :4 (7/5.5/4.7/3.7/2) :8 0/1 0/6
notes | :4 (3/6.4/3.3/2.2/1) $GM7$ 0/1 :16 3-2/1 3-2/2 4-2/3 4-2/4
notes | :4 (7/6.8/4.8/3) $BM7$ :8 (8/4.8/3.7/2) 7/6 :4 (7/6.8/4.8/3.7/2) ##
notes | :4 (6/5.7/4.6/3.7/2) $D#m7b5$ :8 (7/4.6/3.7/2) 6/5 :4 (6/5.7/4.6/3.7/2) ##
notes | :4 (7/5.5/4.7/3.7/2) $Em9$ :8 (7/5.5/4.7/3.7/2) 7/5 :4 (7/5.5/4.7/3.7/2) 8/2
notes | :4 (10/5.11/4.9/3.11/2) $Gdim7$ :4 12/2 :4 (13/5.14/4.12/3.14/2) $A#dim7$ 15/2
VEXTAB

def init
  Rails.application.eager_load!
end

def delete_all
  return if !ENV["DANGEROUSLY_RUN_SEEDS"] && !Rails.env.development?
  ApplicationRecord.descendants.each(&:delete_all)
end

def create_roles
  %W(student teacher admin).each { |name| Role.create!(name: name) }
end

def create_users
  User.create!(
    username: "jaredjj3",
    email:    "jaredjj3@gmail.com",
    password: "testing",
    roles:    Role.all
  )
end

def create_tags
  %W(acoustic ambient beginner classical gospel jazz neosoul fusion metal).each do |tag|
    Tag.create!(name: tag)
  end
end

def create_notations(num)
  teachers = User.joins(user_roles: :role).where(roles: { name: "teacher" })

  num.times do
    Notation.create!(
      transcriber:      teachers.sample,
      youtube_video_id: "https://youtu.be/PYNJXmzxcRU",
      song_name:        Faker::Book.title,
      artist_name:      Faker::Name.name,
      duration_ms:      25275,
      dead_time_ms:     -100,
      bpm:              152,
      vextab_string:    VEXTAB_STRING,
      thumbnail:        File.open(Dir["app/assets/images/thumbnails/*.jpg"].sample),
      featured:         rand < 0.75
    )
  end
end

def create_taggings(up_to)
  tags = Tag.all
  Notation.all.each { |notation| tags.sample(rand(up_to)).each { |tag| notation.tags << tag } }
end

def create_saved_notations
  notations = Notation.all.to_a
  User.all.each { |user| user.saved_notations << notations.sample(rand(notations.size)) }
end

ActiveRecord::Base.transaction do
  raise ActiveRecord::Rollback if !ENV["DANGEROUSLY_RUN_SEEDS"] && !Rails.env.development?
  init
  delete_all
  create_roles
  create_users
  create_tags
  create_notations(75)
  create_taggings(3)
  create_saved_notations
end