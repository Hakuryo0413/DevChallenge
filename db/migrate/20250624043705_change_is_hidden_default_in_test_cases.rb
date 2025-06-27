class ChangeIsHiddenDefaultInTestCases < ActiveRecord::Migration[7.2]
  def change
    change_column_default :test_cases, :is_hidden, from: nil, to: false
  end
end
