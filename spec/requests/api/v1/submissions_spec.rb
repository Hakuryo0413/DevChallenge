require 'rails_helper'

RSpec.describe "Submissions API", type: :request do
  let(:admin_email) { ENV["ADMIN_EMAIL"] || "admin@example.com" }
  let(:admin) { create(:user, email: admin_email) }
  let(:headers) { { "Authorization" => "Bearer #{jwt_token(admin)}" } }

  let(:challenge) { create(:challenge, user: admin) }
  let(:question) { create(:question, challenge: challenge) }

  describe "GET /api/v1/questions/:question_id/submissions" do
    before { create_list(:submission, 2, question: question, user: admin) }

    it "returns all submissions" do
      get "/api/v1/questions/#{question.id}/submissions", headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response.length).to be >= 2
    end
  end

  describe "POST /api/v1/questions/:question_id/submissions" do
    let(:valid_params) do
      {
        submission: {
          code: "print(2 + 3)",
          status: "Accepted"
        }
      }
    end

    let(:invalid_params) do
      {
        submission: {
          code: "",
          status: nil
        }
      }
    end

    context "with valid parameters" do
      it "creates a submission successfully" do
        post "/api/v1/questions/#{question.id}/submissions", params: valid_params, headers: headers

        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to eq("Submission created successfully")
      end
    end

    context "with invalid parameters" do
      it "returns validation errors" do
        post "/api/v1/questions/#{question.id}/submissions", params: invalid_params, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response["message"]).to eq("Submission creation failed")
        expect(json_response["errors"]).to include("Code can't be blank", "Status can't be blank")
      end
    end
  end
end
