class AddHashid < ActiveRecord::Migration
  def change
    change_table :products do |t|
      t.string :hash_id
    end
  end
end
