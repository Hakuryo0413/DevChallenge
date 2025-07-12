require 'rails_helper'

RSpec.describe "Submissions API", type: :request do
  let(:admin_email) { ENV["ADMIN_EMAIL"] || "admin@example.com" }
  let(:admin) { create(:user, email: admin_email) }
  let(:headers) { { "Authorization" => "Bearer #{jwt_token(admin)}" } }

  let(:challenge) { create(:challenge, user: admin) }
  let(:question) { create(:question, challenge: challenge) }

  before do
    create(:test_case, question: question, input: "2", expect_output: "5")
    allow(Judge0Service).to receive(:submit_code).and_return(
      OpenStruct.new(code: 201, body: { "stdout" => "5" })
    )
    $redis.flushdb # Xóa sạch cache trước mỗi test
  end

  describe "GET /api/v1/questions/:question_id/submissions" do
    before { create_list(:submission, 2, question: question, user: admin) }

    it "returns all submissions" do
      get "/api/v1/questions/#{question.id}/submissions", headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response["data"].length).to be >= 2
    end
  end

  describe "POST /api/v1/questions/:question_id/submissions" do
    let(:valid_params) do
      {
        submission: {
          code: "print(2 + 3)",
          status: "Pending",
          language_id: 71
        }
      }
    end

    it "creates a submission and sets result from Judge0" do
      post "/api/v1/questions/#{question.id}/submissions", params: valid_params, headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response["data"]["status"]).to eq("Accepted")
      expect(json_response["data"]["results"]).to be_an(Array)
    end

    it "uses Redis cache on second submission (HIT)" do
      # First request to store in Redis
      post "/api/v1/questions/#{question.id}/submissions", params: valid_params, headers: headers
      expect(response).to have_http_status(:ok)

      # Second identical request should hit cache
      post "/api/v1/questions/#{question.id}/submissions", params: valid_params, headers: headers
      expect(json_response["message"]).to eq("Cached result")
    end

    it "fails with invalid params" do
      post "/api/v1/questions/#{question.id}/submissions", params: { submission: { code: "", status: nil } }, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response["errors"]).to include("Code can't be blank", "Status can't be blank")
    end
  end
end
