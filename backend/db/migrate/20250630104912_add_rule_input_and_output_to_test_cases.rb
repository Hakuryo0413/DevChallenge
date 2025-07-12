class AddRuleInputAndOutputToTestCases < ActiveRecord::Migration[7.2]
  def change
    change_column_null :test_cases, :input, false
    change_column_null :test_cases, :expect_output, false
  end
end
