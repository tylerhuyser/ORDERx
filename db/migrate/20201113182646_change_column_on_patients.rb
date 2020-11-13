class ChangeColumnOnPatients < ActiveRecord::Migration[6.0]
  def change
    change_column_null :patients, :doctor_id, true
  end
end
