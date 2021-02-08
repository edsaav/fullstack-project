class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true, length: { minimum: 7 }

  has_many :users_gifs
  has_many :gifs, through: :users_gifs

  def favorites
    gifs
  end

  def add_favorite(params)
    gif = Gif.find_by external_id: params[:external_id]
    if gif.nil?
      favorites << Gif.create!(params)
    else
      favorites << gif unless favorites.exists? external_id: params[:external_id]
    end
  end
end
