class AddScoreField < ActiveRecord::Migration
  def change
    change_table :products do |t|
      t.float :score
    end
  end
end
