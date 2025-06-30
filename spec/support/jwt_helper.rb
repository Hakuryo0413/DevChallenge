def jwt_token(user)
  Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
end 