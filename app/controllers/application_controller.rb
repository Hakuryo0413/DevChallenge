class ApplicationController < ActionController::API
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  # before_action :configure_permitted_parameters, if: :devise_controller?
  # protected

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up) do |user_params|
  #     user_params.permit(:email, :password, :password_confirmation, :user_type)
  #   end

  # end
end
