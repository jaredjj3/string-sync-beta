# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

# The user model of StringSync.
class User < ApplicationRecord
  attr_reader :password

  has_many(:roles, through: :user_roles)
  has_many(:user_roles, dependent: :destroy)

  validates(:email, :username, uniqueness: { case_sensitive: false })
  validates(:email, :username, presence: true)
  validates(:email, format: { with: /.+@.+/, message: "must be valid" })
  validates(:password, length: { in: 6..20, allow_nil: true })
  validates(:session_token, presence: true, uniqueness: true)
  validates(:email, :username, length: { in: 3..30 })

  after_initialize(:ensure_session_token)
  after_initialize(:downcase_username_and_email)
  before_save(:downcase_username_and_email)

  def self.find_by_credentials(username_or_email, password)
    user = User.find_by(email: username_or_email) || User.find_by(username: username_or_email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def has_roles?(role_names)
    role_names = [role_names] unless role_names.is_a?(Array)
    user_roles = roles.map(&:name).map(&:to_sym)
    role_names.length != (role_names - user_roles).length
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end

    def ensure_role
      self.roles = Role.where(name: "student") if self.roles.blank?
    end

    def downcase_username_and_email
      self.username.downcase!
      self.email.downcase!
    end
end
