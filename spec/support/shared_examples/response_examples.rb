RSpec.shared_examples "not found response" do
  it "returns not found" do
    expect(response).to have_http_status(:not_found)
    expect(json_response["message"]).to include("not found")
  end
end

RSpec.shared_examples "unprocessable entity response" do |error_key|
  it "returns error with 422" do
    expect(response).to have_http_status(:unprocessable_entity)
    expect(json_response["message"]).to include("Failed")
  end
end