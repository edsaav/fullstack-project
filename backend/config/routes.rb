Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :gifs, only: [] do
        get 'search', on: :collection
      end

      resources :users, only: [:create] do
        member do
          resources :gifs, only: [:index] do
            post 'favorite', on: :collection
          end
        end
      end

      post 'user_token' => 'user_token#create'
    end
  end
end
