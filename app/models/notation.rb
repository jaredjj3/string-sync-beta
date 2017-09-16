# == Schema Information
#
# Table name: notations
#
#  id                     :integer          not null, primary key
#  user_id                :integer          not null
#  youtube_video_id       :text             not null
#  name                   :string           not null
#  artist_name            :string           not null
#  vextab                 :text
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  duration               :integer
#  dead_time              :integer          default("0")
#  tempo                  :integer          not null
#  featured               :boolean          default("false"), not null
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

  accepts_nested_attributes_for(:taggings)

  def extract_youtube_id
    self.youtube_video_id = youtube_video_id_match(self.youtube_video_id)[1]
  end

  def taggings_attributes=(*)
    super.tap { taggings.each { |tagging| tagging.notation = self } }
  end

  private

    def youtube_video_id_match(url)
      url.try(:match, /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/)
    end

    def has_valid_video_url
      return unless new_record?

      if youtube_video_id_match(self.youtube_video_id).blank?
        errors[:youtube_video_id] << "must be valid youtube url"
      end
    end
end
