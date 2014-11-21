class AddFilterType < ActiveRecord::Migration
  def change
    change_table :products do |t|
      t.string :filter_type
    end
  end
end
