require 'rails_helper'

RSpec.describe "User Sessions", type: :request do
  let(:user) { create(:user, password: "password123") }
  let(:login_params) do
    {
      user: {
        email: user.email,
        password: "password123"
      }
    }
  end

  describe "POST /login" do
    it "logs in successfully with valid credentials" do
      post "/login", params: login_params

      expect(response).to have_http_status(:ok)
      expect(json_response["status"]["message"]).to eq("Logged in sucessfully.")
      expect(json_response["data"]["email"]).to eq(user.email)
      expect(response.headers["Authorization"]).to be_present
    end
  end

  describe "DELETE /logout" do
    context "when user is logged in" do
      before do
        post "/login", params: login_params
      end

      let(:token) { response.headers["Authorization"] }

      it "logs out successfully" do
        delete "/logout", headers: { "Authorization" => token }

        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to eq("logged out successfully")
      end
    end

    context "when user is not logged in" do
      it "returns unauthorized message" do
        delete "/logout"

        expect(response).to have_http_status(:unauthorized)
        expect(json_response["message"]).to eq("Couldn't find an active session.")
      end
    end
  end
end
