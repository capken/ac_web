class AddProductImage < ActiveRecord::Migration
  def change
    change_table :products do |t|
      t.string :image_url
    end
  end
end
