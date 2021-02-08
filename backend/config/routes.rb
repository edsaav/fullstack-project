Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :gifs, only: [:index] do
        get 'search', on: :collection
        post 'favorite', on: :collection
      end

      resources :users, only: [:create]

      resource :user_token, only: [:create]
    end
  end
end
