class UsersGif < ApplicationRecord
  belongs_to :user
  belongs_to :gif

  validates :user_id, presence: true
  validates :gif_id, presence: true
end
