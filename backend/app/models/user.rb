class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true, length: { minimum: 7 }

  has_many :users_gifs
  has_many :gifs, through: :users_gifs

  def favorites(query=nil)
    return filtered_favorites(query) if query.present?
    gifs.recent_first
  end

  def add_favorite(params)
    gif = Gif.find_by external_id: params[:external_id]
    if gif.nil?
      gifs << Gif.create!(params)
    else
      gifs << gif unless favorites.exists? external_id: params[:external_id]
    end
  end

  private

  def filtered_favorites(query)
    gifs.recent_first.search_title(query)
  end
end
