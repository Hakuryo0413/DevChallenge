require 'rails_helper'

RSpec.describe "User Registrations", type: :request do
  let(:valid_params) do
    {
      user: {
        email: "newuser@example.com",
        password: "password123",
        password_confirmation: "password123"
      }
    }
  end

  let(:invalid_params) do
    {
      user: {
        email: "invalid_email",
        password: "123",
        password_confirmation: "456"
      }
    }
  end

  describe "POST /signup" do
    context "with valid parameters" do
      it "creates a new user" do
        post "/signup", params: valid_params

        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to eq("Signed up successfully.")
        expect(json_response["data"]["email"]).to eq("newuser@example.com")
      end
    end

    context "with invalid parameters" do
      it "returns an error message" do
        post "/signup", params: invalid_params

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response["message"]).to include("User could not be created successfully.")
      end
    end
  end

  describe "DELETE /signup" do
    let(:user) { create(:user, password: "password123") }

    before do
      post "/login", params: {
        user: {
          email: user.email,
          password: "password123"
        }
      }
    end

    let(:token) { response.headers["Authorization"] }

    context "when deletion is successful" do
      it "deletes the account" do
        delete "/signup", headers: { "Authorization" => token }

        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to eq("Account deleted successfully.")
      end
    end

    context "when deletion fails" do
      before do
        allow_any_instance_of(User).to receive(:destroy).and_return(false)
      end

      it "returns error message" do
        delete "/signup", headers: { "Authorization" => token }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response["message"]).to eq("Failed to delete account.")
      end
    end
  end
end
