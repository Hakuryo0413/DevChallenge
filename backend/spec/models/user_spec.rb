# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }

  context "when creating the first user" do
    it { expect(user.email).to eq("user@example.com") }
    it { expect(user.valid_password?("password123")).to be true }
  end
end
