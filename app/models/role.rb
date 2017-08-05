# == Schema Information
#
# Table name: roles
#
#  id   :integer          not null, primary key
#  name :string           not null
#

class Role < ApplicationRecord
  has_many(:user_roles, dependent: :destroy)
  has_many(:users, through: :user_roles)

  validates(:name, presence: true)
  validates(:name, uniqueness: true)
end
