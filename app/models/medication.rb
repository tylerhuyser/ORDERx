class Medication < ApplicationRecord
  belongs_to :patient
  has_many :orders, through: :patients

end
