require 'vcr'
require 'webmock/rspec'

VCR.configure do |config|
  config.cassette_library_dir = 'spec/cassettes' # nơi lưu các response
  config.hook_into :webmock
  config.configure_rspec_metadata! # dùng metadata để auto chạy
  config.filter_sensitive_data('<JUDGE0_API_KEY>') { ENV["JUDGE0_API_KEY"] }
end
