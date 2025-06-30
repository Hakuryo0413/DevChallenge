require 'rails_helper'

RSpec.describe Challenge, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:challenge) { FactoryBot.create(:challenge, user: user) }

  context "user association" do
    it "returns the associated user" do
      expect(challenge.user).to eq(user)  # dòng belongs_to :user được chạy tại đây
    end
  end
end
