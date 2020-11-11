class Patient < ApplicationRecord
  has_and_belongs_to_many :doctors
  has_many :medications
  has_many :orders

  has_secure_password
  validates :password, length: { minimum: 8 }
  validates :first_name, :last_name, :date_of_birth, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
