require 'rails_helper'

RSpec.describe Api::V1::ChallengesController, type: :request do
  let(:admin_email) { ENV["ADMIN_EMAIL"] || "admin@example.com" }
  let(:admin) { FactoryBot.create(:user, email: admin_email) }
  let(:user) { FactoryBot.create(:user) }
  let(:headers) { auth_headers(admin) }

  describe "GET /api/v1/challenges" do
    it "returns all challenges" do
      FactoryBot.create_list(:challenge, 3, user: admin)
      get "/api/v1/challenges", headers: headers
      expect(response).to have_http_status(:ok)
      expect(json_response.length).to be >= 3
    end
  end

  describe "GET /api/v1/challenges/:id" do
    let!(:challenge) { FactoryBot.create(:challenge, user: admin) }

    it "returns the challenge" do
      get "/api/v1/challenges/#{challenge.id}", headers: headers
      expect(response).to have_http_status(:ok)
      expect(json_response["data"]["id"]).to eq(challenge.id)
    end

    context "when challenge is not found" do
      before { get "/api/v1/challenges/9999999", headers: headers }
      it_behaves_like "not found response"
    end
  end

  describe "POST /api/v1/challenges" do
    let(:valid_params) do
      {
        challenge: {
          title: "New Challenge",
          description: "Description",
          start_date: Date.today,
          end_date: Date.today + 7,
          image_url: "https://example.com/image.png"
        }
      }
    end

    it "creates a new challenge" do
      post "/api/v1/challenges", params: valid_params, headers: headers
      expect(response).to have_http_status(:ok)
      expect(json_response["message"]).to include("successfully")
    end

    context "with invalid attributes" do
      let(:invalid_params) do
        {
          challenge: valid_params[:challenge].merge(title: "")
        }
      end

      before { post "/api/v1/challenges", params: invalid_params, headers: headers }
      it_behaves_like "unprocessable entity response", "title"
    end
  end

  describe "DELETE /api/v1/challenges/:id" do
    let!(:challenge) { FactoryBot.create(:challenge, user: admin) }

    context "when challenge exists" do
      it "deletes the challenge" do
        expect {
          delete "/api/v1/challenges/#{challenge.id}", headers: headers
        }.to change(Challenge, :count).by(-1)
        expect(response).to have_http_status(:ok)
      end
    end

    context "when challenge is not found" do
      before { delete "/api/v1/challenges/999999", headers: headers }
      it_behaves_like "not found response"
    end

    context "when challenge deletion fails" do
      before do
        allow_any_instance_of(Challenge).to receive(:destroy).and_return(false)
        allow_any_instance_of(Challenge).to receive_message_chain(:errors, :full_messages).and_return([ "Cannot delete challenge" ])
        delete "/api/v1/challenges/#{challenge.id}", headers: headers
      end

      it_behaves_like "unprocessable entity response", "base"
      it "returns custom error message" do
        expect(json_response["data"]).to include("Cannot delete challenge")
      end
    end
  end
end
