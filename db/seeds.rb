# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Order.destroy_all
Medication.destroy_all
Patient.destroy_all
Doctor.destroy_all

@doctor = Doctor.create!(first_name: 'John', last_name: 'Doe', email: 'admin@gmail.com', password: '12345678')
@patient = Patient.create!(first_name: 'Patty', last_name: 'Smith', email: 'patsy@gmail.com', date_of_birth: '02-03-1994', doctor_id: @doctor.id, password: '12345678')
@singulair = Medication.create!(name: 'Singulair', dosage: '50mg/day', patient_id: @patient.id)
@order = Order.create!(date: '12/31/2020', medication_id: @singulair.id, patient_id: @patient.id, doctor_id: @doctor.id, pharmacy_address: '123 Bridge Roade, New York, NY 10009', filled: false)

puts "#{Doctor.count} doctors created"
puts "#{Patient.count} patients created"
puts "#{Medication.count} medications created"
puts "#{Order.count} orders created"