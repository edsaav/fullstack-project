class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true, length: { minimum: 7 }

  has_many :users_gifs
  has_many :gifs, through: :users_gifs
end
