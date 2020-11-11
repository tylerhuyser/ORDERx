class Order < ApplicationRecord
  belongs_to :medication
  belongs_to :patient
  belongs_to :doctor

end
