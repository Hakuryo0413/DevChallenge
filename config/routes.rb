Rails.application.routes.draw do  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  },
  path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }
  
  get "home/index"

  namespace :api do
    namespace :v1 do
      resources :challenges do
        resources :submissions
      end
    end
  end
end
