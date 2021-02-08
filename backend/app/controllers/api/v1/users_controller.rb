class Api::V1::UsersController < ApplicationController
  def create
    user = User.create!(params.permit(:email, :password))
    render json: {}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    status = e.record&.errors[:email].first == 'has already been taken' ?
      :conflict :
      :unprocessable_entity
    render json: { error: e }, status: status
  end
end
