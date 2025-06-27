class MovePointsFromSubmissionsToQuestions < ActiveRecord::Migration[7.2]
  def change
    remove_column :submissions, :points, :integer
    add_column :questions, :points, :integer, default: 0
  end
end
