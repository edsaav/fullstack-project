Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :gifs, only: [] do
        get 'search', on: :collection
      end
      
      resource :users, only: [:create]

      post 'user_token' => 'user_token#create'
    end
  end
end
