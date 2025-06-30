require 'rails_helper'

RSpec.describe "TestCases API", type: :request do
  let(:admin_email) { ENV["ADMIN_EMAIL"] || "admin@example.com" }
  let(:admin) { create(:user, email: admin_email) }
  let(:headers) { { "Authorization" => "Bearer #{jwt_token(admin)}" } }

  let(:challenge) { create(:challenge, user: admin) }
  let(:question) { create(:question, challenge: challenge) }

  describe "GET /api/v1/questions/:question_id/test_cases" do
    before { create_list(:test_case, 3, question: question) }

    it "returns all test cases for a question" do
      get "/api/v1/questions/#{question.id}/test_cases", headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response.length).to be >= 3
    end
  end

  describe "POST /api/v1/questions/:question_id/test_cases" do
    let(:valid_params) do
      {
        test_case: {
          input: "2 3",
          expect_output: "5",
          is_hidden: false
        }
      }
    end

    let(:invalid_params) do
      {
        test_case: {
          input: "",
          expect_output: nil,
          is_hidden: false
        }
      }
    end

    context "with valid data" do
      it "creates a new test case" do
        post "/api/v1/questions/#{question.id}/test_cases", params: valid_params, headers: headers

        expect(response).to have_http_status(:ok)
        expect(json_response["message"]).to include("successfully")
        expect(json_response["data"]["input"]).to eq("2 3")
        expect(json_response["data"]["expect_output"]).to eq("5")
      end
    end

    context "with invalid data" do
      it "returns error messages" do
        post "/api/v1/questions/#{question.id}/test_cases", params: invalid_params, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response["message"]).to eq("Testcase created fail")
        expect(json_response["data"]).to include("Input can't be blank").or include("Expect output can't be blank")
      end
    end
  end
end
