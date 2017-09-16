# == Schema Information
#
# Table name: taggings
#
#  notation_id :integer          not null
#  tag_id      :integer          not null
#

class Tagging < ApplicationRecord
  belongs_to(:notation)
  belongs_to(:tag)

  # FIXME:
  # validates(:notation, :tag, presence: true)
end
