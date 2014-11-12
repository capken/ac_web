class AddIsProMfrField < ActiveRecord::Migration
  def change
    change_table :products do |t|
      t.boolean :is_pro_mfr
    end
  end
end
