Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :gifs, only: [:index] do
        get 'search', on: :collection
        post 'favorite', on: :collection
      end

      resources :users, only: [:create]

      post 'user_token' => 'user_token#create'
    end
  end
end
