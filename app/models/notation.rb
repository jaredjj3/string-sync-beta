# == Schema Information
#
# Table name: notations
#
#  id                     :integer          not null, primary key
#  user_id                :integer          not null
#  youtube_video_id       :text             not null
#  name                   :string           not null
#  artist_name            :string           not null
#  build_structs          :text
#  scroll_structs         :text
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#

class Notation < ApplicationRecord
  belongs_to(:transcriber, foreign_key: :user_id, class_name: "User")
  has_many(:taggings, dependent: :destroy)
  has_many(:tags, through: :taggings)
  has_many(:user_notations)
  has_many(:followers, through: :user_notations, source: :user)

  has_attached_file(:thumbnail, default_url: "default.jpg")
  validates_attachment_content_type(:thumbnail, content_type: /\Aimage\/.*\z/)

  validates(:user_id, :youtube_video_id, :name, :artist_name, presence: true)
  validate(:has_valid_video_url)

  before_create(:extract_youtube_id)

  def extract_youtube_id
    self.youtube_video_id = youtube_video_id_match(self.youtube_video_id)[1]
  end

  private

    def youtube_video_id_match(url)
      url.match(/^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/)
    end

    def has_valid_video_url
      return unless new_record?

      if youtube_video_id_match(self.youtube_video_id).blank?
        errors[:youtube_video_id] << "must be valid youtube url"
      end
    end

    def ensure_structs
      self.build_structs  ||= { measures: [slices: []] }.to_json
      self.scroll_structs ||= [].to_json
    end
end
