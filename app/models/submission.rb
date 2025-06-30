class Submission < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :code, presence: true
  validates :status, presence: true
  after_create :add_points_if_accepted
  private

  def add_points_if_accepted
    return unless status == "Accepted"
    user.increment!(:total_points, question.points)
  end
end
