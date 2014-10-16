class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :brand
      t.string :model
      t.integer :cadr_dust
      t.boolean :aham_verified
      t.float :power_max
      t.float :noise_max
      t.string :made_in
      t.float :weight
      t.float :price
      t.integer :air_volume
      t.integer :fan_speed_levels
      t.boolean :sleep_mode
      t.boolean :timing
      t.boolean :quality_meter
      t.boolean :filter_reminder
      t.boolean :remote_control
    end
  end
end
