Rails.application.routes.draw do
  get "home/index"

  namespace :api do
    namespace :v1 do
      resources :challenges
    end
  end
end
