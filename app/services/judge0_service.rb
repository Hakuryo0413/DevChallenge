require "net/http"
require "uri"
require "json"
require "ostruct"

class Judge0Service
  API_URL = "https://judge0-ce.p.rapidapi.com"
  API_KEY = ENV["JUDGE0_API_KEY"] # đưa key vào biến môi trường

  HEADERS = {
    "x-rapidapi-key" => API_KEY,
    "x-rapidapi-host" => "judge0-ce.p.rapidapi.com",
    "Content-Type" => "application/json"
  }

  def self.submit_code(language_id:, source_code:, stdin:)
    uri = URI("#{API_URL}/submissions?base64_encoded=false&wait=true&fields=*")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    body = {
      language_id: language_id,
      source_code: source_code,
      stdin: stdin
    }.to_json
    puts "RRRR"
    puts body
    puts "RRRR"

    request = Net::HTTP::Post.new(uri, HEADERS)
    request.body = body

    response = http.request(request)

    OpenStruct.new(
      code: response.code.to_i,
      body: JSON.parse(response.body)
    )
  end
end
