require 'rails_helper'

RSpec.describe Judge0Service do
  describe ".submit_code" do
    context "when mocking Net::HTTP" do
      let(:language_id) { 71 }
      let(:source_code) { "print(2 + 3)" }
      let(:stdin)       { "input text" }

      let(:response_body) do
        {
          "stdout" => "5\n",
          "status" => { "description" => "Accepted" }
        }.to_json
      end

      let(:mock_http_response) do
        instance_double(Net::HTTPResponse, code: "201", body: response_body)
      end

      let(:mock_http) { instance_double(Net::HTTP) }

      before do
        allow(Net::HTTP).to receive(:new).and_return(mock_http)
        allow(mock_http).to receive(:use_ssl=).with(true)
        allow(mock_http).to receive(:request).and_return(mock_http_response)
      end

      it "returns OpenStruct from mocked Judge0 response" do
        result = Judge0Service.submit_code(
          language_id: language_id,
          source_code: source_code,
          stdin: stdin
        )

        expect(result.code).to eq(201)
        expect(result.body["stdout"]).to eq("5\n")
      end
    end

    context "when using real Judge0 API", :vcr do
      it "calls Judge0 API and returns output" do
        result = Judge0Service.submit_code(
          language_id: 71,
          source_code: "print(2 + 3)",
          stdin: ""
        )

        expect(result.code).to eq(201).or eq(200)
        expect(result.body["stdout"].strip).to eq("5")
        expect(result.body["status"]["description"]).to eq("Accepted")
      end
    end
  end
end
