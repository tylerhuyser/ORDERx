class Doctor < ApplicationRecord
  has_many :patients
  has_many :orders

  
  has_secure_password

  validates :password, length: { minimum: 8 }
  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
