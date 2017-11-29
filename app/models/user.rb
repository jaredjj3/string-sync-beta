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

  has_many(:user_roles, dependent: :destroy)
  has_many(:roles, through: :user_roles)
  has_many(:authored_notations, class_name: "Notation")
  has_many(:user_notations)
  has_many(:saved_notations, through: :user_notations, source: :notation)

  validates(:email, :username, uniqueness: { case_sensitive: false })
  validates(:email, :username, presence: true)
  validates(:username, format: { with: /[a-zA-Z0-9_]+/, message: "must only contain letters, numbers, or underscores" })
  validates(:username, format: { with: /[a-zA-Z0-9]{1,}/, message: "must have at least one number or letter" })
  validates(:email, format: { with: /.+@.+/, message: "must be valid" })
  validates(:password, length: { in: 6..20, allow_nil: true })
  validates(:password, format: { with: /((?![<>;]).)*/, message: "must not contain <, >, or ;" })
  validates(:session_token, presence: true, uniqueness: true)
  validates(:email, :username, length: { in: 3..30 })
  validates(:user_roles, presence: true)

  after_initialize(:ensure_session_token)
  after_initialize(:ensure_role)

  def self.find_by_credentials(username_or_email, password)
    username_or_email = username_or_email.downcase.gsub("@", "")
    user = User.includes(:user_notations).find_by(
      "lower(email) = ? or lower(username) = ?",
      username_or_email,
      username_or_email
    )

    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
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

  def has_role?(role_name)
    roles.any? { |role| role.name.to_sym == role_name.to_sym }
  end

  private

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end

    def ensure_role
      self.roles = [Role.where(name: "student").first!] if roles.blank?
    end

    def downcase_username_and_email!
      self.username.downcase!
      self.email.downcase!
    end
end
