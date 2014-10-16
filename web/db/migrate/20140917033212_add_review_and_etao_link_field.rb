class AddReviewAndEtaoLinkField < ActiveRecord::Migration
  def change
    change_table :products do |t|
      t.string :reviews_link
      t.string :etao_link
    end
  end
end
