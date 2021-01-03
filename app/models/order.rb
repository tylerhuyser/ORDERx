class Order < ApplicationRecord
  before_validation :setFilledStatus
  
  belongs_to :medication
  belongs_to :patient
  belongs_to :doctor

  def setFilledStatus
    self.filled = false
  end

end
