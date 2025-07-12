class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json

  def destroy
    resource = current_user
    if resource.destroy
      render json: {
        code: 200,
        message: "Account deleted successfully."
      }, status: :ok
    else
      render json: {
        message: "Failed to delete account."
      }, status: :unprocessable_entity
    end
  end

  private

  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        code: 200,
        message: "Signed up successfully.",
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        message: "User could not be created successfully. #{resource.errors.full_messages.to_sentence}"
      }, status: :unprocessable_entity
    end
  end
end
