# == Schema Information
#
# Table name: user_notations
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  notation_id :integer
#

class UserNotation < ApplicationRecord
  belongs_to(:user)
  belongs_to(:notation)

  validates(:user, :notation, presence: true)
  validates(:user, uniqueness: { scope: [:notation] })
end
