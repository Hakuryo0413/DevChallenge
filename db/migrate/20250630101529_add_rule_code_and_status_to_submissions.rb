class AddRuleCodeAndStatusToSubmissions < ActiveRecord::Migration[7.2]
  def change
    change_column_null :submissions, :code, false
    change_column_null :submissions, :status, false
  end
end
