class AddLevelToQuestion < ActiveRecord::Migration[7.2]
  def change
    add_column :questions, :level, :string
  end
end
