class Api::V1::GifsController < ApplicationController
  def search
    gifs = Gif.search(search_params)
    render json: gifs, result: :ok
  rescue ActionController::ParameterMissing
    render json: { error: 'Invalid query' }, status: :unprocessable_entity
  end

  private

  def search_params
    params.slice(:query, :page).require(:query)
  end
end
