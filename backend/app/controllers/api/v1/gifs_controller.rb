class Api::V1::GifsController < ApplicationController
  before_action :authenticate_user, except: :search

  GIF_PARAMS = [:external_id, :title, :url_large, :url_small]

  def index
    render json: current_user.favorites(params[:query]), status: :ok
  end

  def search
    gifs = Gif.search(search_params)
    render json: gifs, result: :ok
  rescue ActionController::ParameterMissing
    render json: { error: 'Invalid query' }, status: :unprocessable_entity
  end

  def favorite
    gif = current_user.add_favorite(params.slice(*GIF_PARAMS).permit!)
    render json: gif, status: :created
  end

  private

  def search_params
    params.slice(:query, :page).require(:query)
  end
end
