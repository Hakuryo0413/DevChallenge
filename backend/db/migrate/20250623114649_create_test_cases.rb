class CreateTestCases < ActiveRecord::Migration[7.2]
  def change
    create_table :test_cases do |t|
      t.references :question, null: false, foreign_key: true
      t.text :input
      t.text :expect_output
      t.boolean :is_hidden

      t.timestamps
    end
  end
end
