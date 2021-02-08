Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :gifs, only: [] do
        get 'search', on: :collection
      end

      resource :users, only: [:create]
    end
  end
end
