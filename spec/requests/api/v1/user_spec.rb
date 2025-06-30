require 'rails_helper'

RSpec.describe "Users API", type: :request do
  let!(:users) do
    (1..12).map do |i|
      create(:user, total_points: i * 10, email: "user#{i}@example.com")
    end
  end

  describe "GET /api/v1/users" do
    it "returns top 10 users ordered by total_points descending" do
      get "/api/v1/users"

      expect(response).to have_http_status(:ok)
      expect(json_response["message"]).to eq("Top 10 users")
      expect(json_response["data"].length).to eq(10)
      expect(json_response["data"].first["total_points"]).to be >= json_response["data"].last["total_points"]
    end
  end

  describe "GET /api/v1/users/:id" do
    context "when user exists" do
      let(:user) { create(:user) }

      it "returns the user" do
        get "/api/v1/users/#{user.id}"

        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to eq("User found")
        expect(json_response["data"]["id"]).to eq(user.id)
      end
    end

    context "when user does not exist" do
      it "returns not found" do
        get "/api/v1/users/999999"

        expect(response).to have_http_status(:not_found)
        expect(json_response["message"]).to eq("User not found")
      end
    end
  end
end
