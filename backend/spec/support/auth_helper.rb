# spec/support/auth_helper.rb
module AuthHelper
  def auth_headers(user)
    { "Authorization" => "Bearer #{jwt_token(user)}" }
  end
end
