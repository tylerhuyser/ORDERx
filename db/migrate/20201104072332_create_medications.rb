class CreateMedications < ActiveRecord::Migration[6.0]
  def change
    create_table :medications do |t|
      t.string :name
      t.string :dosage
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
