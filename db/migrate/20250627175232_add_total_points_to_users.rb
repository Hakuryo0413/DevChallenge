class AddTotalPointsToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :total_points, :integer
  end
end
