class AddDefaultTotalPointsToUsers < ActiveRecord::Migration[7.2]
  def change
    change_column_default :users, :total_points, 0
  end
end
