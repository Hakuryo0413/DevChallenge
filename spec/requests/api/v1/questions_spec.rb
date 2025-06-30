require 'rails_helper'

RSpec.describe "Questions API", type: :request do
  let(:admin_email) { ENV["ADMIN_EMAIL"] || "admin@example.com" }
  let(:admin) { create(:user, email: admin_email) }
  let(:user) { create(:user) }
  let(:challenge) { create(:challenge, user: user) }

  let(:headers) { { "Authorization" => "Bearer #{jwt_token(admin)}" } }
  let(:user_headers) { { "Authorization" => "Bearer #{jwt_token(user)}" } }

  describe "GET /api/v1/questions" do
    before { create_list(:question, 3, challenge: challenge) }

    it "returns all questions" do
      get "/api/v1/questions", headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response.length).to be >= 3
    end
  end

  describe "GET /api/v1/challenges/:challenge_id/questions/specific" do
    it "returns the questions for a challenge" do
      get "/api/v1/challenges/#{challenge.id}/questions/specific", headers: headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /api/v1/questions/:id" do
    let!(:question) { create(:question, challenge: challenge) }

    context "when found" do
      it "returns the question" do
        get "/api/v1/questions/#{question.id}", headers: headers

        expect(response).to have_http_status(:ok)
        expect(json_response["data"]["id"]).to eq(question.id)
      end
    end

    context "when not found" do
      before { get "/api/v1/questions/9999999", headers: headers }
      it_behaves_like "not found response"
    end
  end

  describe "DELETE /api/v1/challenges/:challenge_id/questions/:id" do
    let!(:question) { create(:question, challenge: challenge) }

    context "when delete is successful" do
      it "deletes the question" do
        expect {
          delete "/api/v1/challenges/#{challenge.id}/questions/#{question.id}", headers: headers
        }.to change(Question, :count).by(-1)

        expect(response).to have_http_status(:ok)
      end
    end

    context "when delete fails" do
      before do
        allow_any_instance_of(Question).to receive(:destroy).and_return(false)
        allow_any_instance_of(Question).to receive_message_chain(:errors, :full_messages).and_return(["Cannot delete question"])
      end

      it "returns error" do
        delete "/api/v1/challenges/#{challenge.id}/questions/#{question.id}", headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response["data"]).to include("Cannot delete question")
      end
    end
  end

  describe "POST /api/v1/challenges/:challenge_id/questions" do
    let(:valid_params) do
      {
        question: {
          title: "New Question",
          level: "Hard",
          description: "Description",
          starter_code: "print(1)",
          points: 100
        }
      }
    end

    let(:invalid_params) do
      {
        question: {
          title: "",
          description: "",
          level: nil,
          points: nil
        }
      }
    end

    it "creates a new question for admin" do
      post "/api/v1/challenges/#{challenge.id}/questions", params: valid_params, headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response["message"]).to include("successfully")
    end

    it "returns error when invalid" do
      post "/api/v1/challenges/#{challenge.id}/questions", params: invalid_params, headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response["data"]).to include("Title can't be blank").or include("Description can't be blank")
    end
  end
end
