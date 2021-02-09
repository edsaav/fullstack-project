class Gif < ApplicationRecord
  validates :external_id, presence: true

  has_many :users_gifs
  has_many :users, through: :users_gifs

  # Enables fuzzy full text search
  include PgSearch::Model
  pg_search_scope :search_title, against: :title

  scope :recent_first, -> { includes(:users_gifs).order('users_gifs.created_at DESC') }

  API_KEY = ENV['GIPHY_KEY'].freeze
  SEARCH_LIMIT = 25.freeze
  SEARCH_RATING = 'g'.freeze

  class << self
    def search(query, page=1)
      raise ArgumentError.new 'query required for search' if query.blank?
      opts = {
        limit: SEARCH_LIMIT,
        offset: (page - 1) * SEARCH_LIMIT,
        rating: SEARCH_RATING
      }
      query_giphy(query, opts)&.data&.map { |gif| normalize gif } || []
    end

    private

    def query_giphy(query, opts)
      begin
        $giphy.gifs_search_get(API_KEY, query, opts)
      rescue GiphyClient::ApiError => e
        raise StandardError.new e
      end
    end

    def normalize(gif)
      Gif.new(
        external_id: gif.id,
        title: gif.slug,
        url_small: gif.images.fixed_height.url
      )
    end
  end
end
