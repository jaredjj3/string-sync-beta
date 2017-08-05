# == Schema Information
#
# Table name: user_roles
#
#  role_id    :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserRole < ApplicationRecord
  belongs_to(:user)
  belongs_to(:role)

  validates(:user, :role, presence: true)
end
