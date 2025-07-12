class Submission < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :code, presence: true
  validates :status, presence: true
  after_create :add_points_if_accepted
  private

  def add_points_if_accepted
    puts "CALLBACK TRIGGERED"
    puts "Status: #{status}"

    return unless status == "Accepted"

    puts "Status is Accepted, proceeding..."
    puts "User: #{user.inspect}"
    puts "Question: #{question.inspect}"
    puts "Points: #{question.points.inspect}"

    user.increment!(:total_points, question.points.to_i)
  end
end
