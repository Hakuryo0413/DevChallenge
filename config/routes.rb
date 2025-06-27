Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  },
  path: "", path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  }

  get "home/index"

  namespace :api do
    namespace :v1 do
      resources :users
      resources :challenges do
        resources :questions, only: %i[ create destroy ] do
          collection do
            get :specific
          end
        end
      end
      resources :questions, only: %i[ index show ] do
        resources :test_cases
        resources :submissions
      end
    end
  end
end
