class AddIndex < ActiveRecord::Migration
  def change
    add_index :products, :hash_id
    add_index :products, :cadr_dust
  end
end
