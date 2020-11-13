class AddFilledToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :filled, :boolean
  end
end
