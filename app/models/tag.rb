# == Schema Information
#
# Table name: tags
#
#  id   :integer          not null, primary key
#  name :string           not null
#

class Tag < ApplicationRecord
  has_many(:taggings, dependent: :destroy)
  has_many(:notations, through: :taggings)

  validates(:name, presence: true)
  validates(:name, uniqueness: true)
end
