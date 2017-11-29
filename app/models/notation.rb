# == Schema Information
#
# Table name: notations
#
#  id                     :integer          not null, primary key
#  transcriber_id         :integer          not null
#  youtube_video_id       :text             not null
#  song_name              :string           not null
#  artist_name            :string           not null
#  vextab_string          :text
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  duration_ms            :integer
#  dead_time_ms           :integer          default("0"), not null
#  bpm                    :integer          default("0"), not null
#  featured               :boolean          default("false"), not null
#

class Notation < ApplicationRecord
  YOUTUBE_ID_REGEX = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/

  belongs_to(:transcriber, foreign_key: :transcriber_id, class_name: "User")
  has_many(:taggings, dependent: :destroy)
  has_many(:tags, through: :taggings)
  has_many(:user_notations)
  has_many(:followers, through: :user_notations, source: :user)

  has_attached_file(:thumbnail, default_url: "default.jpg")
  validates_attachment_content_type(:thumbnail, content_type: /\Aimage\/.*\z/)

  validates(*%i(user_id youtube_video_id song_name artist_name dead_time_ms bpm), presence: true)
  validate(:validate_video_url)

  before_create(:extract_youtube_id)

  def extract_youtube_id
    self.youtube_video_id = youtube_video_id_match(self.youtube_video_id)[1]
  end

  private

    def youtube_video_id_match(url)
      url.try(:match, YOUTUBE_ID_REGEX)
    end

    def validate_video_url
      return unless new_record?

      if youtube_video_id_match(self.youtube_video_id).blank?
        errors[:youtube_video_id] << "must be valid youtube url"
      end
    end
end
